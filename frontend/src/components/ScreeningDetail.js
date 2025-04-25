import React , { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ScreeningDetail = () => {
    const { title } = useParams();
    console.log("Movie Name:", title);

    return null;
}

export default ScreeningDetail;