package com.homelyhub.dto;

public class OwnerStatsDto {

    private long totalProperties;
    private long totalBookings;
    private long pendingBookings;
    private long confirmedBookings;
    private double estimatedRevenue;

    public OwnerStatsDto() {
    }

    public OwnerStatsDto(long totalProperties, long totalBookings, long pendingBookings, long confirmedBookings, double estimatedRevenue) {
        this.totalProperties = totalProperties;
        this.totalBookings = totalBookings;
        this.pendingBookings = pendingBookings;
        this.confirmedBookings = confirmedBookings;
        this.estimatedRevenue = estimatedRevenue;
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

    public double getEstimatedRevenue() {
        return estimatedRevenue;
    }

    public void setEstimatedRevenue(double estimatedRevenue) {
        this.estimatedRevenue = estimatedRevenue;
    }
}
