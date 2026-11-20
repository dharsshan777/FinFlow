import React from 'react';
import { BsPencilSquare } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { GiArcheryTarget } from "react-icons/gi";
import './Phone.css';

export default function Phone() {


const work = [
    {
        id: 1,
        icon: <BsPencilSquare />,
        title: "Add Your Expenses",
        description: "Log your daily expenses"
    },
    {
        id: 2,
        icon: <VscGraph />,
        title: "Set Your Budget",
        description: "Keep track of your progress"
    },
    {
        id: 3,
        icon: <GiArcheryTarget />,
        title: "Achieve Your Goals",
        description: "Spend smarter and save more"
    }
];

return (
    <div>
        <section className="manage-sec">
            <div className="container">
                <div className="row align-items-center">

                    {/* Left side image */}

                    <div className="col-lg-6 col-12">
                        <div className="manage-img">
                            <img
                                src="/images/smartphone-img.png"
                                alt="Smartphone"
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    {/* Right side content */}

                    <div className="col-lg-6 col-12">
                        <div className="manage-content">

                            <h2 className='head1'>Manage Your Money <span className='smart-hed'>Smarter</span></h2>

                            <p className='para-head2'>
                                Take control of your finances with ExpenseWise.
                                Track expenses, manage your budget, and achieve
                                your financial goals.
                            </p>

                            {work.map((item) => (
                                <div className="work-item" key={item.id}>

                                    <div className="work-icon">
                                        {item.icon}
                                    </div>

                                    <div className="work-text">
                                        <h5 className='mon-title'>{item.title}</h5>
                                        <p className='des-para'>{item.description}</p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </section>
    </div>
);

}
