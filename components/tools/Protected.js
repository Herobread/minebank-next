import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'

export default function Protected({ requiredUserType, redirect }) {
    const router = useRouter()
    redirect ??= router.route

    const { user } = useAuth()

    if (requiredUserType === 'user' && !user) {
        router.push({
            pathname: `/login`,
            query: { from: redirect }
        })

        return
    }

    // && userData?.isAdmin !== true
    // if (requiredUserType === 'admin') {
    //     router.push({
    //         pathname: '',
    //         query: { from: redirect }
    //     })

    //     return
    // }

    if (requiredUserType === null && user) {
        router.push({
            pathname: redirect
        })

        return
    }
}
