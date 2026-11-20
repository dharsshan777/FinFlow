
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import {
    MdOutlineEmail,
    MdArrowBack,
    MdOutlineEdit,
    MdOutlineLightbulb
} from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { BsShieldCheck } from 'react-icons/bs';

import Sidebar from '../component/Sidebar';

import './ProfilePage.css';
import DashboardHeader from './DashboardHeader';

export default function ProfilePage() {
    const navigate = useNavigate();

    const loggedUser = JSON.parse(
    localStorage.getItem('loggedUser') || 'null'
);

const savedProfile = JSON.parse(
    localStorage.getItem(`userProfile_${loggedUser?.email}`) || 'null'
);

const firstName =
    savedProfile?.Firstname ||
    savedProfile?.firstname ||
    loggedUser?.Firstname ||
    loggedUser?.firstname ||
    '';

const lastName =
    savedProfile?.Lastname ||
    savedProfile?.lastname ||
    loggedUser?.Lastname ||
    loggedUser?.lastname ||
    '';

const email = loggedUser?.email || loggedUser?.Email || '';

const fullName = `${firstName} ${lastName}`.trim() || 'Your Name';

    return (
        <div className="profile-page">

            {/* Existing Sidebar */}
            <Sidebar />

            <div className="profile-main">

                {/* Existing Dashboard Header */}
                <DashboardHeader></DashboardHeader>
               

                <main className="profile-content">

                    {/* Page Heading */}
                    <div className="profile-heading-row">

                        <div className="profile-heading-left">
                            <div className="profile-heading-icon">
                                <IoPersonOutline />
                            </div>

                            <div>
                                <h2>My Profile</h2>
                                <p>
                                    View and manage your account information.
                                </p>
                            </div>
                        </div>

                        <button
                            className="back-dashboard-btn"
                            onClick={() => navigate('/dashboard')}
                        >
                            <MdArrowBack />
                            <span>Back to Dashboard</span>
                        </button>

                    </div>

                    {/* Profile Banner */}
                    <section className="profile-banner">

                        <div className="profile-banner-user">

                            <div className="profile-large-avatar">
                                <IoPersonOutline />
                            </div>

                            <div className="profile-banner-divider"></div>

                            <div className="profile-banner-details">
                                <h2>{fullName}</h2>

                                <p className="profile-email">
                                    <MdOutlineEmail />
                                    <span>
                                        {email || 'Email not available'}
                                    </span>
                                </p>

                                <span className="member-badge">
                                    <GiReceiveMoney />
                                    ExpenseWise Member
                                </span>
                            </div>

                        </div>

                        {/* Simple decorative finance illustration */}
                        <div className="profile-banner-art" aria-hidden="true">
                            <div className="profile-chart">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="profile-coins">
                                <div className="coin coin-one"></div>
                                <div className="coin coin-two"></div>
                                <div className="coin coin-three"></div>
                            </div>
                        </div>

                        <button
                            className="profile-edit-btn"
                            onClick={() => navigate('/profileupd')}
                        >
                            <MdOutlineEdit />
                            Edit Profile
                        </button>

                    </section>

                    {/* Bottom Cards */}
                    <div className="profile-cards-grid">

                        {/* Personal Information */}
                        <section className="profile-info-card">

                            <div className="profile-card-heading">
                                <div className="profile-card-icon">
                                    <IoPersonOutline />
                                </div>

                                <div>
                                    <h3>Personal Information</h3>
                                    <p>
                                        Your personal details associated with
                                        your account.
                                    </p>
                                </div>
                            </div>

                            <div className="personal-detail-row">
                                <div className="detail-icon">
                                    <IoPersonOutline />
                                </div>

                                <span className="detail-label">
                                    First Name
                                </span>

                                <strong>
                                    {firstName || 'Not provided'}
                                </strong>
                            </div>

                            <div className="personal-detail-row">
                                <div className="detail-icon">
                                    <IoPersonOutline />
                                </div>

                                <span className="detail-label">
                                    Last Name
                                </span>

                                <strong>
                                    {lastName || 'Not provided'}
                                </strong>
                            </div>

                            <div className="personal-detail-row">
                                <div className="detail-icon">
                                    <MdOutlineEmail />
                                </div>

                                <span className="detail-label">
                                    Email Address
                                </span>

                                <strong className="detail-email">
                                    {email || 'Not provided'}
                                </strong>
                            </div>

                        </section>

                        {/* Account Information */}
                        <section className="profile-info-card">

                            <div className="profile-card-heading">
                                <div className="profile-card-icon shield-icon">
                                    <BsShieldCheck />
                                </div>

                                <div>
                                    <h3>Account Information</h3>
                                    <p>
                                        Information about your ExpenseWise
                                        account.
                                    </p>
                                </div>
                            </div>

                            <div className="account-status-row">

                                <div className="account-calendar-icon">
                                    <FaRegCalendarAlt />
                                </div>

                                <div className="account-status-text">
                                    <span>Account Status</span>
                                    <strong>
                                        Your account is active and secure.
                                    </strong>
                                </div>

                                <span className="active-badge">
                                    <span className="active-dot"></span>
                                    Active
                                </span>

                            </div>

                            <div className="profile-tip">
                                <MdOutlineLightbulb />

                                <div>
                                    <h4>Tip</h4>
                                    <p>
                                        Keep tracking your expenses regularly
                                        to achieve your financial goals!
                                    </p>
                                </div>
                            </div>

                        </section>

                    </div>

                </main>
            </div>
        </div>
    );
}
