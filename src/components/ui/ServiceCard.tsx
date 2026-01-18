'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  images?: string[];
  index: number;
}

export default function ServiceCard({ 
  id, 
  title, 
  shortDescription,
  image,
  images,
  index 
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none)').matches
    );
  }, []);
  
  // 3D tilt effect like Apple (disabled on touch devices)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [4, -4]);
  const rotateY = useTransform(x, [-100, 100], [-4, 4]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Use images array if available, otherwise fallback to single image
  const galleryImages = images && images.length > 0 ? images : [image];
  const hasCollage = galleryImages.length >= 6;
  
  // Blur placeholder for seamless loading
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8AyDT9MuNV1GK0tIzLPK2FRfpPwD2SBgdZzWt7Y2vb7W13ELq3huRH5AjljDhS3ElRkd4H7SlKpZNhaZ//2Q==";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: isTouchDevice ? 0.4 : 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full"
    >
      <Link href={`/services/${id}`}>
        <motion.div
          className="group relative cursor-pointer"
          onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 150)}
          style={isTouchDevice ? {} : {
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Main Card */}
          <motion.div
            className="relative bg-[#1a1a1a] rounded-2xl md:rounded-[2rem] overflow-hidden will-change-transform"
            animate={{
              boxShadow: isHovered && !isTouchDevice
                ? '0 50px 100px -20px rgba(0, 0, 0, 0.5)'
                : '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
            }}
            transition={{ duration: isTouchDevice ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
                {/* Photo Collage Grid */}
            {hasCollage ? (
              <div className="relative p-3 md:p-4">
                <div className="grid grid-cols-3 grid-rows-3 gap-1.5 md:gap-2 h-[280px] sm:h-[340px] md:h-[400px]">
                  {/* Top left - small */}
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden bg-[#2a2a2a]">
                    <Image
                      src={galleryImages[0]}
                      alt={`${title} project 1`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 150px"
                      quality={70}
                      loading="eager"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  </div>
                  
                  {/* Top center - small */}
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden bg-[#2a2a2a]">
                    <Image
                      src={galleryImages[1]}
                      alt={`${title} project 2`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 150px"
                      quality={70}
                      loading="eager"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  </div>
                  
                  {/* Top right - large, spans 2 rows */}
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden row-span-2 bg-[#2a2a2a]">
                    <Image
                      src={galleryImages[2]}
                      alt={`${title} project 3`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 200px"
                      quality={75}
                      loading="eager"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  </div>
                  
                  {/* Middle left - medium, spans 2 columns */}
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden col-span-2 bg-[#2a2a2a]">
                    <Image
                      src={galleryImages[3]}
                      alt={`${title} project 4`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 66vw, 300px"
                      quality={75}
                      loading="eager"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  </div>
                  
                  {/* Bottom row - 3 small images */}
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden bg-[#2a2a2a]">
                    <Image
                      src={galleryImages[4]}
                      alt={`${title} project 5`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 150px"
                      quality={70}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  </div>
                  
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden bg-[#2a2a2a]">
                    <Image
                      src={galleryImages[5]}
                      alt={`${title} project 6`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 150px"
                      quality={70}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  </div>
                  
                  {/* Last cell - show 7th image or more count (only if there are more than 6 images) */}
                  {galleryImages.length > 6 && (
                    <div className="relative rounded-lg md:rounded-xl overflow-hidden bg-[#2a2a2a]">
                      {galleryImages[6] && (
                        <Image
                          src={galleryImages[6]}
                          alt={`${title} project 7`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 150px"
                          quality={70}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                        />
                      )}
                      {galleryImages.length > 7 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <span className="text-white/90 text-sm font-medium">+{galleryImages.length - 7}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Single image fallback */
              <div className="relative aspect-[16/10] overflow-hidden bg-[#2a2a2a]">
                <motion.div
                  className="w-full h-full"
                  animate={{ 
                    scale: isHovered && !isTouchDevice ? 1.05 : 1,
                  }}
                  transition={{ duration: isTouchDevice ? 0.2 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={80}
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
              </div>
            )}

            {/* Content Area */}
            <div className="relative px-5 pb-5 pt-2 md:px-6 md:pb-6 md:pt-3">
              {/* Glowing accent line */}
              <motion.div
                className="absolute top-0 left-5 right-5 md:left-6 md:right-6 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
                }}
                animate={{ 
                  opacity: isHovered || isTouchDevice ? 1 : 0.3,
                  scaleX: isHovered || isTouchDevice ? 1 : 0.5,
                }}
                transition={{ duration: isTouchDevice ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Title */}
              <motion.div className="overflow-hidden mb-2">
                <motion.h3 
                  className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight"
                  animate={{ y: isHovered && !isTouchDevice ? -2 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {title}
                </motion.h3>
              </motion.div>
              
              <motion.p 
                className="text-white/60 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2"
                animate={{ 
                  opacity: isHovered || isTouchDevice ? 1 : 0.8,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {shortDescription}
              </motion.p>

              {/* CTA Row */}
              <div className="flex items-center justify-between">
                <motion.div 
                  className="flex items-center gap-2"
                  animate={{ x: isHovered && !isTouchDevice ? 4 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-white font-medium text-sm tracking-wide">
                    Explore Collection
                  </span>
                  <motion.div
                    animate={{ 
                      x: isHovered && !isTouchDevice ? 6 : 0,
                      opacity: isHovered || isTouchDevice ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>

                {/* Project count indicator */}
                <motion.div 
                  className="flex items-center gap-2"
                  animate={{ opacity: isHovered || isTouchDevice ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex -space-x-1">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-5 h-5 rounded-full bg-white/10 border-2 border-[#1a1a1a]"
                        initial={false}
                        animate={{ 
                          scale: isHovered && !isTouchDevice ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                      />
                    ))}
                  </div>
                  <span className="text-white/50 text-xs">{galleryImages.length}+ Projects</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Glow effect */}
          {!isTouchDevice && (
            <motion.div
              className="absolute -inset-1 rounded-[2rem] opacity-0 blur-2xl -z-10 hidden md:block"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.1))',
              }}
              animate={{ opacity: isHovered ? 0.4 : 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}
