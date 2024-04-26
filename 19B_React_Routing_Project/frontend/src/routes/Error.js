import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function Error() {

    const error = useRouteError();

    let title = "An Error Occurred!"
    let msg = "Something went wrong"

    if (error.status === 500) {
        msg = error.data.msg;
    }

    if (error.status === 404) {
        title = "Not found";
        msg = "Could not find the page"
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{msg}</p>
            </PageContent>
        </>
    )
}