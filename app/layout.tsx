import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import Head from 'next/head';
import './globals.css'
import clsx from "clsx";
// import {NextSeo} from "next-seo";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kalina Dvin/Կալինա Դվին/Калина двин',
  description: 'Kalina Dvin/Կալինա Դվին/Калина двин: «СВОБОДА»,«BIG»,«Авангард»,«BUMFA GROUP»,\n' +
      '«BIO WORLD» և «Терпак» պաշտոնական ներկայացուցիչը ՀՀ-ում:',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="icon" sizes="16x16" href="/icons/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="android-chrome" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
      <link rel="android-chrome-512" type="image/png" sizes="512x512" href="/icons/android-chrome-512x512.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icons/android-chrome-512x512.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <meta
          name="description"
          content="Kalina Dvin/Կալինա Դվին/Калина двин: «СВОБОДА»,«BIG»,«Авангард»,«BUMFA GROUP»,«BIO WORLD» և «Терпак» պաշտոնական ներկայացուցիչը ՀՀ-ում:"
      />
      <meta
          name="title"
          content="Kalina Dvin/Կալինա Դվին/Калина двин"
      />
      <title>
        Kalina Dvin/Калина двин
      </title>
    </head>
      <body className={clsx(inter.className, 'bg-[#fcfbfb]')} style={{overflowX: "hidden"}}>{children}</body>
    </html>
  )
}
