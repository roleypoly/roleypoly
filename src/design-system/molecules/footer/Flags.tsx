import * as React from 'react';

type FlagsProps = {
    width?: number | string;
    height?: number | string;
};

export const Flags = (props: FlagsProps) => (
    <svg width={props.width} height={props.height} viewBox="0 0 3372 900" version="1.1">
        <defs>
            <rect id="path-3" x="1772" y="0" width="1600" height="900" rx="100"></rect>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Rectangle-5"></g>
            <g id="Trans">
                <rect
                    id="Rectangle"
                    fill="#55CDFC"
                    x="0"
                    y="0"
                    width="1600"
                    height="900"
                    rx="100"
                ></rect>
                <rect
                    id="Rectangle-2"
                    fill="#F7A8B8"
                    x="0"
                    y="170"
                    width="1600"
                    height="560"
                ></rect>
                <rect
                    id="Rectangle-3"
                    fill="#FFFFFF"
                    x="0"
                    y="350"
                    width="1600"
                    height="200"
                ></rect>
            </g>
            <mask id="mask-4" fill="white">
                <use href="#path-3"></use>
            </mask>
            <g id="Rectangle-5"></g>
            <g id="Geyy" mask="url(#mask-4)">
                <g transform="translate(1772.000000, 0.000000)" id="Rectangle-4">
                    <rect
                        fill="#F9238B"
                        x="0"
                        y="0"
                        width="1600"
                        height="151.006711"
                    ></rect>
                    <rect
                        fill="#FB7B04"
                        x="0"
                        y="150"
                        width="1600"
                        height="151.006711"
                    ></rect>
                    <rect
                        fill="#FFCA66"
                        x="0"
                        y="300"
                        width="1600"
                        height="151.006711"
                    ></rect>
                    <rect
                        fill="#00B289"
                        x="0"
                        y="450"
                        width="1600"
                        height="151.006711"
                    ></rect>
                    <rect
                        fill="#5A38B5"
                        x="0"
                        y="598.993289"
                        width="1600"
                        height="151.006711"
                    ></rect>
                    <rect
                        fill="#B413F5"
                        x="0"
                        y="748.993289"
                        width="1600"
                        height="151.006711"
                    ></rect>
                </g>
            </g>
        </g>
    </svg>
);
