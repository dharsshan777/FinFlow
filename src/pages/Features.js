
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import './Features.css';

import {
    FiTrendingUp,
    FiTarget,
    FiShoppingBag,
    FiAward,
    FiBarChart2,
    FiBookOpen
} from 'react-icons/fi';

export default function Features() {

    const features = [
        {
            icon: <FiTrendingUp />,
            title: 'Expense Tracking',
            description: 'Record your daily expenses and understand where your money goes.'
        },
        {
            icon: <FiTarget />,
            title: 'Budget Management',
            description: 'Create monthly budgets and keep your spending under control.'
        },
        {
            icon: <FiShoppingBag />,
            title: 'Need vs Want',
            description: 'Understand the difference between essential and unnecessary spending.'
        },
        {
            icon: <FiAward />,
            title: 'Savings Goals',
            description: 'Set savings targets and develop a regular saving habit.'
        },
        {
            icon: <FiBarChart2 />,
            title: 'Reports & Insights',
            description: 'View your financial summaries and understand your spending habits.'
        },
        {
            icon: <FiBookOpen />,
            title: 'Student Friendly',
            description: 'Manage your pocket money, daily expenses and savings in one place.'
        }
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="features-hero">
                <div className="container">
                    <h1>
                        Explore Our <span>Features</span>
                    </h1>

                    <p>
                        Everything you need to manage your money,
                        track expenses and build better financial habits.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">

                    <div className="features-heading">
                        <h2>What We Offer</h2>
                        <p>
                            Simple tools to make managing your money easier.
                        </p>
                    </div>

                    <div className="row g-4">

                        {features.map((feature, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div className="feature-card">

                                    <div className="feature-icon">
                                        {feature.icon}
                                    </div>

                                    <h4>{feature.title}</h4>

                                    <p>{feature.description}</p>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>



            <Footer />
        </>
    );
}
