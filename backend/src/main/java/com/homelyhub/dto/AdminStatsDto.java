package com.homelyhub.dto;

public class AdminStatsDto {

    private long totalUsers;
    private long totalOwners;
    private long totalProperties;
    private long totalBookings;
    private long pendingBookings;
    private long confirmedBookings;

    public AdminStatsDto() {
    }

    public AdminStatsDto(long totalUsers, long totalOwners, long totalProperties, long totalBookings, long pendingBookings, long confirmedBookings) {
        this.totalUsers = totalUsers;
        this.totalOwners = totalOwners;
        this.totalProperties = totalProperties;
        this.totalBookings = totalBookings;
        this.pendingBookings = pendingBookings;
        this.confirmedBookings = confirmedBookings;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalOwners() {
        return totalOwners;
    }

    public void setTotalOwners(long totalOwners) {
        this.totalOwners = totalOwners;
    }

    public long getTotalProperties() {
        return totalProperties;
    }

    public void setTotalProperties(long totalProperties) {
        this.totalProperties = totalProperties;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public long getPendingBookings() {
        return pendingBookings;
    }

    public void setPendingBookings(long pendingBookings) {
        this.pendingBookings = pendingBookings;
    }

    public long getConfirmedBookings() {
        return confirmedBookings;
    }

    public void setConfirmedBookings(long confirmedBookings) {
        this.confirmedBookings = confirmedBookings;
    }
}
