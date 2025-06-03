
import React from 'react';
import '../styles/TopHeader.css'; 
import notificationIcon from '../assets/icons/notification-bell.svg';
import userProfileIcon from '../assets/icons/user-profile.svg';

function TopHeader({ title }) {
    return (
        <header className="top-header">
            <div className="top-header-title-container">
                <h1 className="top-header-title">{title}</h1>
            </div>
            <div className="top-header-actions">
                <button className="icon-button notification-button" aria-label="Notifications">
                    <img src={notificationIcon} alt="Notifications" />
                </button>
                <button className="icon-button profile-button" aria-label="User Profile">
                    <img src={userProfileIcon} alt="User Profile" />
                </button>
            </div>
        </header>
    );
}

export default TopHeader;