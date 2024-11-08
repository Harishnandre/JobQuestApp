import React, { useContext } from "react";
import { Authcontext } from "../../ContextAPI/Authcontext";
import JobCard from "../../JobCard";
import './index.css'
import { ToastContainer } from "react-toastify";

const Bookmarks = () => {
    const [auth] = useContext(Authcontext);
    const { user } = auth || {};
    console.log(user)
    const { bookmarkJob } = user || [];

    return (
        <div className="bookmarks-container">
            <h1>Bookmarks</h1>
            <div className="bookmark-cards">
            {bookmarkJob && bookmarkJob.length > 0 ? (
                bookmarkJob.map((eachJob) => (
                    <JobCard key={eachJob._id} job={eachJob} />
                ))
            ) : (
                <p>You have not yet saved any jobs.</p>
            )}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Bookmarks;
