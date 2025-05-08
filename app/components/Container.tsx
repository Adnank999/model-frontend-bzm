'use client'
import { Client } from '@gradio/client';
import React, { useEffect, useState } from 'react'
import UploadImage from './UploadImage';


const Container = () => {



    return (
        <div className="max-w-5xl mx-auto mt-10 p-4">
            <UploadImage />
        </div>
    )
}

export default Container