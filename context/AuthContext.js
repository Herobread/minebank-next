import { auth, db, storage } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUserData = () => {};

    const unsubscribeShopData = onSnapshot(
      collection(db, "products"),
      (docs) => {
        const products = [];

        docs.forEach((doc) => {
          products.push(doc.data());
        });

        setShopData(products);
      }
    );

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ uid: user.uid, email: user.email });
      } else {
        setUser(null);
        setUserData(null);
      }

      if (user) {
        unsubscribeUserData = onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.data() === undefined) {
            createUserDocument(user.uid, {
              minecoins: 0,
              username: user.uid,
              transactions: [],
            });
          }
          setUserData(doc.data());
        });
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
      unsubscribeUserData();
    };
  }, []);

  const createUserDocument = async (uid, data) => {
    await setDoc(doc(db, "users", uid), data).catch((error) => {
      console.log(error);
    });
  };

  const signup = async ({ email, password, username }) => {
    const isSameName = await getUserUid(username);

    if (isSameName) {
      throw { message: "User with this name already exists" };
    }

    return await createUserWithEmailAndPassword(auth, email, password).then(
      (res) => {
        const { uid } = res.user;

        createUserDocument(uid, {
          minecoins: 0,
          username: username,
          email: email,
          personalOrders: [],
          businessOrders: [],
          recent: [],
          transactions: [],
        });
      }
    );
  };

  const login = async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // const sendEmail = async (email) => {

  //     const hostname = window.location.hostname;
  //     console.log(hostname)

  //     const actionCodeSettings = {
  //         url: `https://${hostname}/confirmPasswordless/`,
  //         handleCodeInApp: true,
  //         // dynamicLinkDomain: `localhost`
  //     }

  //     console.log(`sending to ${email}`)

  //     await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  //         .then(() => {
  //             window.localStorage.setItem('emailForSignIn', email)
  //             console.log(`send to ${email}`)
  //             console.log('ok')
  //         })
  //         .catch((err) => {
  //             throw err
  //         })
  // }

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserData = async (uid, data) => {
    return await setDoc(doc(db, "users", uid), data, { merge: true });
  };

  const getUserUid = async (name) => {
    const q = query(
      collection(db, "users"),
      where("username", "==", name),
      limit(1)
    );

    const possibleUsers = await getDocs(q);
    if (possibleUsers.docs.length === 0) return null;

    const recipientUid = possibleUsers.docs[0].id;

    return recipientUid;
  };

  const getUserData = async ({ name, uid }) => {
    let docRef = "";

    if (name) {
      docRef = doc(db, "users", getUserUid(name));
    } else if (uid) {
      docRef = doc(db, "users", uid);
    } else {
      return null;
    }

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  };

  const transfer = async ({
    sender,
    senderUid,
    recipient,
    recipientUid,
    amount,
    comment,
  }) => {
    senderUid = senderUid || (await getUserUid(sender));
    recipientUid = recipientUid || (await getUserUid(recipient));

    let senderData = await getUserData({ uid: senderUid });
    let recipientData = await getUserData({ uid: recipientUid });

    if (senderData.minecoins < amount) {
      throw "You don`t have enough money to make this payment";
    }

    if (recipientData === null) {
      const indexOfOutdatedName = senderData?.recent.indexOf(recipient);

      if (indexOfOutdatedName !== -1) {
        senderData.recent.splice(indexOfOutdatedName, 1);
        const newSenderData = { recent: senderData.recent };
        await setDoc(doc(db, "users", senderUid), newSenderData, {
          merge: true,
        });
      }

      throw "User was not found";
    }

    if (recipientData["username"] === senderData["username"]) {
      throw "You can`t transfer money to yourself";
    }

    let timestamp = new Date();
    timestamp = timestamp.getTime();

    if (senderData["transactions"] === undefined) {
      senderData["transactions"] = [];
    }
    if (senderData["recent"] === undefined) {
      senderData["recent"] = [];
    }
    if (!senderData["recent"].includes(recipientData["username"])) {
      senderData["recent"].push(recipientData["username"]);
    }

    if (recipientData["transactions"] === undefined) {
      recipientData["transactions"] = [];
    }
    if (recipientData["recent"] === undefined) {
      recipientData["recent"] = [];
    }
    if (!recipientData["recent"].includes(senderData["username"])) {
      recipientData["recent"].push(senderData["username"]);
    }

    const senderImg = senderData.img || null;
    const recipientImg = recipientData.img || null;

    const newSenderData = {
      minecoins: parseInt(senderData["minecoins"]) - parseInt(amount),
      transactions: senderData["transactions"].concat([
        {
          timestamp: timestamp,
          amount: `-${amount}`,
          user: recipientData["username"],
          img: recipientImg,
          tags: ["transfer", "out"],
          comment: comment,
        },
      ]),
      recent: senderData["recent"],
    };
    const newRecipientData = {
      minecoins: parseInt(recipientData["minecoins"]) + parseInt(amount),
      transactions: recipientData["transactions"].concat([
        {
          timestamp: timestamp,
          amount: `${amount}`,
          user: senderData["username"],
          img: senderImg,
          tags: ["transfer", "in"],
          comment: comment,
        },
      ]),
      recent: recipientData["recent"],
    };

    await setDoc(doc(db, "users", senderUid), newSenderData, { merge: true });
    await setDoc(doc(db, "users", recipientUid), newRecipientData, {
      merge: true,
    });
  };

  const createProduct = async (uid, userData, data) => {
    let { name, price, inStock, img, description } = data;

    if (img == null) {
      throw "You need to choose an image for the product";
    }

    img = img[0];

    if (price < 1) {
      throw "Price must be at least 1 Mc";
    }

    description ??= "";

    let timestamp = new Date();
    timestamp = timestamp.getTime();

    const id = timestamp.toString();

    const imgUrl = await uploadImage({
      img: img,
      path: `products/${id}`,
    });

    let productData = {
      authorUid: uid,
      authorUsername: userData["username"],
      product: {
        sold: 0,
        name: name,
        price: parseInt(price),
        inStock: parseInt(inStock),
        img: imgUrl,
        description: description,
        created: parseInt(timestamp),
      },
      reviews: [],
    };

    await setDoc(doc(db, "products", id), productData);
  };

  async function updateProduct(id, data) {
    let { price, img } = data.product;

    if (typeof img !== "string" || "undefined") {
      data.product.img = await uploadImage({
        img: img[0],
        path: `products/${id}`,
      });
    }

    if (price < 1) {
      throw "Price must be at least 1 Mc";
    }

    return await updateDoc(doc(db, "products", id), data, { merge: true });
  }

  async function deleteProduct(id) {
    return await deleteDoc(doc(db, "products", id));
  }

  const findProduct = (id) => {
    return shopData?.find((item) => {
      if (item.product.created === parseInt(id)) return item;
    });
  };

  const orderProduct = async ({ productId, buyerUid }) => {
    const date = new Date();

    let buyerData = await getUserData({ uid: buyerUid });
    let productData = findProduct(productId);

    const sellerUid = productData.authorUid;

    if (sellerUid === buyerUid) {
      throw "You can`t buy your items";
    }

    let sellerData = await getUserData({ uid: sellerUid });

    if (buyerData.personalOrders == null) {
      buyerData.personalOrders = [];
    }
    if (sellerData.businessOrders == null) {
      sellerData.businessOrders = [];
    }

    buyerData.minecoins -= productData.product.price;

    if (buyerData.minecoins < 0) {
      const difference = -1 * buyerData.minecoins;

      throw `You don\`t have enough money to buy ${productData.product.name}. You need ${difference} Mc more.`;
    }

    buyerData.transactions.push({
      timestamp: date.getTime(),
      amount: `-${productData.product.price}`,
      user: productData.product.name,
      img: productData.product.img,
      tags: ["shop", "out", productData.authorUsername],
      comment: `Shop, ${productData.authorUsername}`,
    });

    buyerData.personalOrders.push({
      sellerUid: sellerUid,
      buyerUid: buyerUid,
      productId: productId,
      key: date.getTime(),
      name: productData.product.name,
      price: productData.product.price,
      status: "waiting",
      authorUsername: productData.authorUsername,
      img: productData.product.img,
    });
    sellerData.businessOrders.push({
      sellerUid: sellerUid,
      buyerUid: buyerUid,
      productId: productId,
      key: date.getTime(),
      name: productData.product.name,
      price: productData.product.price,
      status: "waiting",
      authorUsername: buyerData.username,
      img: productData.product.img,
    });
    productData.product.sold += 1;
    productData.product.inStock -= 1;

    if (productData.product.inStock < 0) {
      // for some reason it visually updated product data to some negative values
      //so I just returned value to previous values
      productData.product.sold -= 1;
      productData.product.inStock += 1;
      throw "Not enough products in stock";
    }

    await setDoc(doc(db, "users", sellerUid), sellerData, { merge: true });
    await setDoc(doc(db, "users", buyerUid), buyerData, { merge: true });

    await setDoc(doc(db, "products", productId.toString()), productData, {
      merge: true,
    });

    return;
  };

  const updateOrderStatus = async ({ buyerUid, sellerUid, key, status }) => {
    let buyerData = await getUserData({ uid: buyerUid });
    let sellerData = await getUserData({ uid: sellerUid });

    const date = new Date();

    const buyerOrderIndex = buyerData.personalOrders.findIndex((order) => {
      return order.key === key;
    });
    const sellerOrderIndex = sellerData.businessOrders.findIndex((order) => {
      return order.key === key;
    });

    const order = buyerData.personalOrders[buyerOrderIndex];
    const { price } = order;
    buyerData.personalOrders[buyerOrderIndex].status = status;
    sellerData.businessOrders[sellerOrderIndex].status = status;

    if (status === "delivered") {
      const img = buyerData.img ? buyerData.img : null;
      sellerData.minecoins += parseInt(price);
      sellerData.transactions.push({
        timestamp: date.getTime(),
        amount: `${price}`,
        user: buyerData.username,
        img: img,
        tags: ["shop", "in"],
        comment: "Shop",
      });
    } else if (status === "canceled") {
      let productData = findProduct(order.productId);

      productData.product.sold -= 1;
      productData.product.inStock += 1;

      buyerData.minecoins += parseInt(price);
      buyerData.transactions.push({
        timestamp: date.getTime(),
        amount: `${price}`,
        user: order.name,
        img: order.img,
        tags: ["shop", "in"],
        comment: "Shop refund",
      });

      await setDoc(
        doc(db, "products", order.productId.toString()),
        productData,
        { merge: true }
      );
    }

    await setDoc(doc(db, "users", sellerUid), sellerData, { merge: true });
    await setDoc(doc(db, "users", buyerUid), buyerData, { merge: true });
  };

  const addReview = async ({ id, byUid, from, review }) => {
    const { username, img } = from;
    const { rating, comment } = review;

    let timestamp = new Date();
    timestamp = timestamp.getTime();

    let product = await getDoc(doc(db, "products", id));
    product = product.data();

    if (!img) {
      img = "";
    }
    if (rating <= 0) throw "Rate the product";

    const indexOfReview = product.reviews.findIndex(
      (review) => review.byUid === byUid
    );

    const newReview = {
      by: username,
      byUid: byUid,
      img: img,
      comment: comment,
      rating: rating,
      timestamp: timestamp,
    };

    if (indexOfReview !== -1) {
      product.reviews[indexOfReview] = newReview;
    } else {
      product.reviews.push(newReview);
    }

    await setDoc(doc(db, "products", id), product, { merge: true });
  };

  const uploadImage = async ({ img, path }) => {
    const imgRef = ref(storage, path);
    let url = "";

    await uploadBytes(imgRef, img);

    await getDownloadURL(imgRef).then((res) => {
      console.log(`sus ${res}`);
      url = res;
    });

    return url;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        userData,
        shopData,
        getUserUid,
        createUserDocument,
        updateUserData,
        transfer,
        login,
        signup,
        // sendEmail,
        resetPassword,
        logout,
        createProduct,
        updateProduct,
        deleteProduct,
        findProduct,
        orderProduct,
        updateOrderStatus,
        addReview,
        uploadImage,
      }}
    >
      {loading ? "Loading" : children}
    </AuthContext.Provider>
  );
};
