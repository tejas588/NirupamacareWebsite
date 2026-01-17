import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import { api } from '../api'; // ✅ Use your centralized API file
import './Doctors.css';

const Doctors = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get initial values from URL
    const initialLocation = searchParams.get('location') || '';
    const initialSpec = searchParams.get('specialization') || '';

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Local state for the input fields
    const [filters, setFilters] = useState({
        location: initialLocation,
        specialization: initialSpec
    });

    // Sync local state with URL params if they change externally (e.g. back button)
    useEffect(() => {
        setFilters({
            location: searchParams.get('location') || '',
            specialization: searchParams.get('specialization') || ''
        });
        fetchDoctors();
    }, [searchParams]);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            // Get current URL params
            const currentParams = new URLSearchParams(window.location.search);
            const location = currentParams.get('location') || '';
            const specialization = currentParams.get('specialization') || '';

            // Use the centralized API function
            const data = await api.searchDoctors({ location, specialization });

            // Data should already be an array
            if (Array.isArray(data)) {
                setDoctors(data);
            } else {
                console.warn("Unexpected response format:", data);
                setDoctors([]);
            }

        } catch (error) {
            console.error("Failed to fetch doctors:", error);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (filters.location) params.append('location', filters.location);
        if (filters.specialization) params.append('specialization', filters.specialization);

        // Pushing to history triggers the useEffect above
        navigate(`/doctors?${params.toString()}`);
    };

    return (
        <div className="doctors-page">
            <header className="docs-header">
                <h1>Find your Doctor</h1>
                <div className="docs-search-bar">
                    <input
                        type="text"
                        placeholder="Location (e.g. Kolkata)"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Specialization (e.g. Dentist)"
                        value={filters.specialization}
                        onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </header>

            <div className="doctors-grid">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading doctors...</p>
                    </div>
                ) : (
                    <>
                        {doctors.length > 0 ? (
                            doctors.map(doc => (
                                <DoctorCard key={doc.id || doc._id} doctor={doc} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <h3>No doctors found matching your criteria.</h3>
                                <p>Try clearing filters or changing your location.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Doctors;