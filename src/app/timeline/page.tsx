import { useInView } from "react-intersection-observer";
// import { useInfiniteQuery } from '@tanstack/react-query'

import React from 'react';

export default function TimelinePage(){

    const fetchMorePosts = () => {
        // Mock fetch function to simulate loading new content ...
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
        <div className="bg-gray-50 flex justify-center p-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="mr-2">
                        <img src="https://unsplash.it/32/32" alt="User Avatar" className="rounded-full" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">작성자 : </p>
                        <p className="text-xs text-gray-500">작성일 : 2023/12/03</p>
                    </div>
                </div>
                <div className="mb-4">
                    <img src="https://unsplash.it/600/300" alt="Project Image" className="w-auto h-auto rounded-lg" />
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">콘텐츠 들어갈 부분</p>
                </div>
                <div className="mb-4">
                    <div>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded ">Like</button>
                        <br />
                        <br/ > 
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">Comment</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}