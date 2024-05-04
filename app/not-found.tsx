import Link from "next/link";
import { headers } from "next/headers";
import Header from "./components/header";
import NotFoundMockup from "@/public/mockups/notfoundMockup";
import Buttons from "./components/buttons";
export default async function NotFound() {
    return (
        <div className="">
            <Header />
            <div className=" flex flex-col justify-center items-center">
                <NotFoundMockup width={700} height={400} />

                <p className="mt-5 text-2xl mb-5">
                    Oops, it seems like you lost your way
                </p>
                <Buttons secondary={true}>
                    View <Link href="/">Return to Home</Link>
                </Buttons>
            </div>
        </div>
    );
}
