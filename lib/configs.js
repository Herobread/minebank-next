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
            message: 'Enter valid email'
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
        required: 'Amount is required',
        pattern: {
            value: /^(0|[1-9]\d*)(\.\d+)?$/,
            message: 'Amount must be a number'
        }
    },
    comment: {
        required: false
    }
}