import * as React from 'react';
import Link from 'next/link'

const Card = (props) => {
    const {title, Icon, path, value} = props;

    return (<div className={"2xl:w-1/6 xl:w-1/4 md:w-1/3 p-4"}>
        <Link href={path}>
            <a className="border border-gray-200 hover:shadow-lg shadow shadow-indigo-100 ring-1 ring-indigo-300 p-6 rounded-lg block">
                <div
                    className="w-10 h-10 flex items-center justify-center mx-auto rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <Icon className="text-2xl"/>
                </div>
                <h2 className="text-3xl text-gray-900 font-bold title-font mb-2">{value}</h2>
                <p className="leading-relaxed text-2xl text-base">{title}</p>
            </a>
        </Link>
    </div>);
};

export default Card;