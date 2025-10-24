{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import Link from "next/link";\
\
export default function Home() \{\
  return (\
    <main className="p-8">\
      <h1 className="text-4xl font-bold text-blue-900">ZotFood \'97 Duolingo for Cooking</h1>\
      <p className="mt-4 text-lg">\
        Learn to cook with student-friendly recipes, streaks, and micro-lessons.\
      </p>\
      <ul className="list-disc pl-6 mt-6 space-y-2">\
        <li><Link href="/dashboard" className="text-blue-700 underline">Dashboard</Link></li>\
        <li><Link href="/recipes" className="text-blue-700 underline">Browse Recipes</Link></li>\
        <li><Link href="/pantry" className="text-blue-700 underline">Manage Pantry</Link></li>\
        <li><Link href="/learn" className="text-blue-700 underline">Cooking Lessons</Link></li>\
      </ul>\
    </main>\
  );\
\}\
}