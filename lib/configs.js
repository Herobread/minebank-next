export const formVerifiers = {
    username: {
        required: 'Username is required',
        pattern: {
            value: /^\S+$/,
            message: 'Username can not contain any spaces'
        }
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: /^(.+)@(.+)$/,
            message: 'Email is not valid'
        }
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must have at least 8 characters'
        }
    },
    amount: {
        required: 'This field is required',
        pattern: {
            value: /^(0|[1-9]\d*)?$/,
            message: 'This field is invalid'
        }
    },
    comment: {
        required: false
    },
    url: {
        required: false
    },
    required: {
        required: 'This field is required'
    }
}

export const navList = [
    {
        name: `Profile`,
        isHighlighted: false,
        to: '/profile'
    },
    {
        name: 'Bank',
        isHighlighted: false,
        to: '/bank'
    },
    {
        name: 'Business',
        isHighlighted: false,
        to: '/business'
    },
    {
        name: 'Shop',
        isHighlighted: false,
        to: '/shop'
    },
    {
        name: 'Orders',
        isHighlighted: false,
        to: '/shop/orders'
    }
]