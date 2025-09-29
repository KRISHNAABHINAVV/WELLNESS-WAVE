import React from 'react';
import Card from '../ui/Card';
import { useTranslation } from '../../hooks/useTranslation';
import { CameraIcon } from '../ui/Icons';

const images = [
    {
        src: 'https://images.unsplash.com/photo-1620247924683-497746533866?q=80&w=870&auto=format&fit=crop',
        alt: 'Brahmaputra River in Assam',
        caption: 'Brahmaputra River, Assam',
    },
    {
        src: 'https://images.unsplash.com/photo-1599454100523-73d84ef4623c?q=80&w=1032&auto=format&fit=crop',
        alt: 'Loktak Lake in Manipur',
        caption: 'Loktak Lake, Manipur',
    },
    {
        src: 'https://images.unsplash.com/photo-1620766165556-0f7f4577f8a7?q=80&w=870&auto=format&fit=crop',
        alt: 'Umiam Lake in Meghalaya',
        caption: 'Umiam Lake, Meghalaya',
    },
    {
        src: 'https://images.unsplash.com/photo-1582896914532-a2b9d2109438?q=80&w=870&auto=format&fit=crop',
        alt: 'Tawang, Arunachal Pradesh',
        caption: 'Tawang, Arunachal Pradesh'
    }
];

const ImageGallery: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Card title={t('image_gallery_title')} icon={<CameraIcon className="w-6 h-6" />}>
            <p className="text-base-content mb-4">{t('image_gallery_desc')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="group relative">
                        <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-40 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center p-1 rounded-b-lg">
                            {image.caption}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default ImageGallery;