import { useRouter } from "next/router"

export default function Profile() {
    const router = useRouter();
    const name = router.query.id;

    return <>
        {name} profile
    </>
}