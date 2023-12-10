


import { useInView } from "react-intersection-observer";
import React from 'react';

export default function TimelinePage(){

    const fetchMorePosts = () => {
        // Mock fetch function to simulate loading new content
        // ...
    };
    // React.useEffect(() => {
    //     let observer;
    //     const list = document.querySelector('#post-list');
    //     const lastItem = () => list.lastElementChild;
    
    //     const createObserver = () => {
    //       let options = {
    //         root: null,
    //         rootMargin: "20px",
    //         threshold: 1.0
    //       };
    
    //       observer = new IntersectionObserver((entries, observer) => {
    //         entries.forEach(entry => {
    //           if (entry.isIntersecting) {
    //             fetchMorePosts();
    //           }
    //         });
    //       }, options);
    
    //       observer.observe(lastItem());
    //     };
    
    //     createObserver();
    //   }, []);
    


    return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Timeline Page</h1>
        <div id="post-list">
            <div className="bg-white shadow rounded-lg mb-6 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="font-semibold">작성자</h2>
                        <p className="text-sm text-gray-600">2023-12-12</p>
                    </div>
                    <div className="w-16 h-16 bg-gray-300 rounded">사진이 들어감</div>
                </div>
                <p className="mb-4">컨텐츠 내용이 들어갈 곳</p>
                <div className="flex items-center justify-start">
                    <button className="text-blue-600 hover:text-blue-800 mr-4">Like</button>
                    <button className="text-blue-600 hover:text-blue-800">Comment</button>
                </div>
            </div>
        {/* Repeat the post block to simulate multiple posts */}
        {/* ... */}
        </div>
    </div>
    );
}