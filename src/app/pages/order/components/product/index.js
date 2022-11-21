import React, { Component, useEffect, useState } from "react";

const Product = (props) => {
    const { item, onCloseHandle } = props;

    return (
        <>
        {item && (
            <div className="product">
                <div className="flex pt-[25px] pr-[25px] close-button">
                    <span className="hand text-header">x</span>
                </div>
                <div className="ml-[40px]">
                    <div className="text-header">{item.item.name}</div>
                    <div className="flex">
                        <div className="mr-[29px] image-area flex">
                            <img src={item.item.image} width={90} height={90} onClick={(e) => {onCloseHandle()}}/>
                        </div>
                        <div className="ml-[80px] mr-[35px] mb-[60px]">
                            <div className="text-header">Size</div>
                            <div className="text-header-400">42cm(L) x 37cm(W) x 29.7cm(H)</div>
                            <div className="text-header">Max Weight</div>
                            <div className="text-header-400">42cm(L) x 37cm(W) x 29.7cm(H)</div>
                            <div className="text-header">Fits for</div>
                            <div className="text-header-400">42cm(L) x 37cm(W) x 29.7cm(H)</div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default Product;