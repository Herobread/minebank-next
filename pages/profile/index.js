import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Navbar from "@/components/UI/Navbar";
import Subtext from "@/components/UI/Subtext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Margin from "@/components/skeleton/Margin";
import VerticalList from "@/components/UI/VerticalList";
import { fadeAnimations } from "@/lib/animations";
import { formVerifiers, navList } from "@/lib/configs";
import Header from "@/components/UI/Header";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/UI/Input";
import { useEffect, useState } from "react";
import FlexRow from "@/components/skeleton/FlexRow";
import { useRouter } from "next/router";
import Text from "@/components/UI/Text";
import SubHeader from "@/components/UI/SubHeader";
import FileInput from "@/components/UI/FileInput";

export default function Profile() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    register,
  } = useForm();
  const { logout, user, userData, updateUserData, uploadImage, getUserUid } =
    useAuth();
  const router = useRouter();

  const [isLoading, setisLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClick = () => {
    router.push("/login");
    logout();
  };

  const onSubmit = async (data) => {
    setisLoading(true);

    const img = data.img[0];

    const usernameOwner = await getUserUid(data.username);

    const isAvailableName = !usernameOwner;
    const isSameName = usernameOwner === user.uid;
    let imgUrl = "";

    await uploadImage({
      img: img,
      path: `profilePic/${user.uid}`,
    }).then((res) => {
      imgUrl = res;
    });

    data.img = imgUrl;

    if (isAvailableName || isSameName) {
      await updateUserData(user.uid, data);

      setServerError("");
      setSuccess("Data updated successfully");

      setisLoading(false);
      return;
    } else {
      setServerError(`Username "${data.username}" is already taken`);

      setisLoading(false);
      return;
    }
  };

  useEffect(() => {
    setValue("username", userData?.username);
    // setValue('img', userData?.img || '')
    return () => {};
  }, [userData]);

  return (
    <div>
      <Protected requiredUserType={"user"} />
      <Navbar />
      <ContentWrapper>
        <motion.div {...fadeAnimations}>
          <Margin height={"20px"} />
          <Header
            subheader={"Your profile"}
            cta={
              <Button type={"danger"} onClick={handleClick}>
                Sign out
              </Button>
            }
          >
            {userData?.username}
          </Header>
          <Margin height={"20px"} />

          <SubHeader>Customise</SubHeader>
          {/* <Margin height={'10px'} /> */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* username */}
            <Controller
              defaultValue=""
              name="username"
              control={control}
              rules={formVerifiers.username}
              render={({ field }) => <Input label={"Username"} {...field} />}
            />
            <Margin height="5px" />
            <Subtext type="error">
              {errors.username && errors.username?.message}
            </Subtext>
            <Margin height="5px" />

            {/* img */}
            <FileInput
              name="img"
              control={control}
              label={"Profile picture"}
              initialImg={userData?.img}
            />

            <Margin height="5px" />
            <Subtext type="error">{errors.img && errors.img?.message}</Subtext>
            <Margin height="5px" />

            <Subtext timeout={5000} changeContent={setSuccess} type="ok">
              {success && success}
            </Subtext>

            <Subtext type="error">{serverError && serverError}</Subtext>
            <Margin height="5px" />

            <FlexRow flexDirection={"row-reverse"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FlexRow>

            <SubHeader>Details</SubHeader>
            <Margin height="10px" />
            <Text>Email: {user?.email}</Text>
            <Margin height="5px" />
            <Text>UID: {user?.uid}</Text>
            <Margin height="10px" />
            {/* <Text>Joined on 12 septem</Text> */}
          </form>
        </motion.div>
      </ContentWrapper>
    </div>
  );
}
