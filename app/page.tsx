// "use client";

// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // Type for our text field definitions
// type FieldDef = {
//   id: string;
//   label: string;
//   top: number; // position in centimeters
//   left: number; // position in centimeters
//   fontSize?: number; // font size in pt
//   widthCm?: number; // width of the text block in cm
// };

// // Sample fields based on your LTG-PROMISSORY-NOTE template
// const defaultFields: FieldDef[] = [
//   {
//     id: "date_full",
//     label: "Date (day, month, year)",
//     top: 1.7,
//     left: 1.2,
//     fontSize: 11,
//     widthCm: 12,
//   },
//   {
//     id: "amount_words",
//     label: "Amount in words",
//     top: 2.6,
//     left: 1.2,
//     fontSize: 11,
//     widthCm: 18,
//   },
//   {
//     id: "amount_php",
//     label: "Amount (Php)",
//     top: 1.7,
//     left: 14.5,
//     fontSize: 11,
//     widthCm: 5,
//   },
//   {
//     id: "borrower_names",
//     label: "Borrower name(s)",
//     top: 3.6,
//     left: 1.2,
//     fontSize: 11,
//     widthCm: 16,
//   },
//   {
//     id: "interest_rate",
//     label: "Interest rate (%)",
//     top: 4.6,
//     left: 1.2,
//     fontSize: 11,
//     widthCm: 6,
//   },
//   {
//     id: "venue",
//     label: "Venue",
//     top: 8.5,
//     left: 1.2,
//     fontSize: 11,
//     widthCm: 12,
//   },
//   {
//     id: "principal_sign",
//     label: "Principal (printed name)",
//     top: 11.6,
//     left: 2.4,
//     fontSize: 11,
//     widthCm: 10,
//   },
//   {
//     id: "co_maker_sign",
//     label: "Co-Maker (printed name)",
//     top: 11.6,
//     left: 10.4,
//     fontSize: 11,
//     widthCm: 10,
//   },
//   {
//     id: "witness_name",
//     label: "Witness (printed name)",
//     top: 13.4,
//     left: 8.4,
//     fontSize: 11,
//     widthCm: 10,
//   },
// ];

// export default function Page() {
//   const [fields, setFields] = useState<FieldDef[]>(defaultFields);
//   const [values, setValues] = useState<Record<string, string>>(() => {
//     const obj: Record<string, string> = {};
//     defaultFields.forEach((f) => (obj[f.id] = ""));
//     return obj;
//   });
//   const [bgImage, setBgImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   function onValueChange(id: string, v: string) {
//     setValues((s) => ({ ...s, [id]: v }));
//   }

//   function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     setBgImage(url);
//   }

//   function updateFieldPos(id: string, top: number, left: number) {
//     setFields((curr) =>
//       curr.map((f) => (f.id === id ? { ...f, top, left } : f))
//     );
//   }

//   // Print text only (no background)
//   function openPrintWindow() {
//     const html = `
//       <html>
//         <head>
//           <meta charset="utf-8" />
//           <title>Print - Filled Form</title>
//           <style>
//             @page { size: legal portrait; margin: 0; }
//             body { margin: 0; font-family: Arial, sans-serif; }
//             .paper { position: relative; width: 21.59cm; height: 35.56cm; }
//             .field { position: absolute; white-space: pre-wrap; overflow: visible; }
//           </style>
//         </head>
//         <body>
//           <div class="paper">
//             ${fields
//               .map((f) => {
//                 const content = (values[f.id] || "")
//                   .replace(/&/g, "&amp;")
//                   .replace(/</g, "&lt;")
//                   .replace(/>/g, "&gt;");
//                 return `<div class="field" style="top:${f.top}cm; left:${
//                   f.left
//                 }cm; font-size:${f.fontSize ?? 11}pt; width:${
//                   f.widthCm ?? 10
//                 }cm;">${content}</div>`;
//               })
//               .join("")}
//           </div>
//           <script>
//             window.onload = function() {
//               window.print();
//               setTimeout(()=>window.close(), 200);
//             };
//           </script>
//         </body>
//       </html>
//     `;
//     const w = window.open("", "_blank", "toolbar=0,location=0,menubar=0");
//     if (w) {
//       w.document.open();
//       w.document.write(html);
//       w.document.close();
//     } else {
//       alert("Popup blocked. Please allow popups for this site.");
//     }
//   }

//   return (
//     <main className="min-h-screen p-6 bg-slate-50">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-semibold mb-4">
//           LTG Promissory Note — Form Filler
//         </h1>

//         <section className="grid grid-cols-3 gap-6">
//           {/* Form inputs */}
//           <div className="col-span-1 bg-white p-4 rounded shadow">
//             <h2 className="font-medium mb-2">Form Inputs</h2>
//             <div className="space-y-3">
//               {fields.map((f) => (
//                 <div key={f.id}>
//                   <label className="text-sm font-medium">{f.label}</label>
//                   <input
//                     value={values[f.id]}
//                     onChange={(e) => onValueChange(f.id, e.target.value)}
//                     className="w-full border rounded px-2 py-1 mt-1 text-sm"
//                   />
//                   <div className="flex gap-2 mt-1 text-xs">
//                     <label>Top (cm)</label>
//                     <input
//                       type="number"
//                       step="0.1"
//                       value={f.top}
//                       onChange={(e) =>
//                         updateFieldPos(
//                           f.id,
//                           parseFloat(e.target.value || "0"),
//                           f.left
//                         )
//                       }
//                       className="w-20 border rounded px-1"
//                     />
//                     <label>Left (cm)</label>
//                     <input
//                       type="number"
//                       step="0.1"
//                       value={f.left}
//                       onChange={(e) =>
//                         updateFieldPos(
//                           f.id,
//                           f.top,
//                           parseFloat(e.target.value || "0")
//                         )
//                       }
//                       className="w-20 border rounded px-1"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4 flex gap-2">
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="px-3 py-2 bg-indigo-600 text-white rounded"
//               >
//                 Upload Template
//               </button>
//               <input
//                 ref={fileInputRef}
//                 onChange={onUpload}
//                 type="file"
//                 accept="image/*,.pdf"
//                 className="hidden"
//               />

//               <button
//                 onClick={openPrintWindow}
//                 className="px-3 py-2 bg-green-600 text-white rounded"
//               >
//                 Print
//               </button>
//             </div>

//             <p className="mt-3 text-xs text-slate-600">
//               Upload a scanned image of your pre-printed form and adjust the
//               Top/Left values until text aligns with blanks.
//             </p>
//           </div>

//           {/* Preview */}
//           <div className="col-span-2">
//             <Card className="w-full">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold">
//                   Preview / Calibrate
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative border rounded overflow-hidden bg-white">
//                   {/* Container maintaining legal-size aspect ratio */}
//                   <div
//                     style={{
//                       width: "100%",
//                       paddingTop: "164%",
//                       position: "relative",
//                     }}
//                   >
//                     <div
//                       className="absolute top-0 left-0 flex justify-center items-center"
//                       style={{ width: "100%", height: "100%" }}
//                     >
//                       <div
//                         className="relative"
//                         style={{
//                           width: "21.59cm",
//                           height: "35.56cm",
//                           boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
//                         }}
//                       >
//                         {/* ✅ Optimized Next.js Image */}
//                         {bgImage ? (
//                           <Image
//                             src={bgImage}
//                             alt="template"
//                             fill
//                             unoptimized
//                             style={{ objectFit: "cover" }}
//                             priority
//                           />
//                         ) : (
//                           <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
//                             No template uploaded — upload a scanned image to
//                             calibrate
//                           </div>
//                         )}

//                         {/* 🖊️ Render positioned text fields */}
//                         {fields.map((f) => (
//                           <div
//                             key={f.id}
//                             style={{
//                               position: "absolute",
//                               top: `${f.top}cm`,
//                               left: `${f.left}cm`,
//                               fontSize: `${f.fontSize ?? 11}pt`,
//                               width: `${f.widthCm ?? 10}cm`,
//                               whiteSpace: "pre-wrap",
//                               pointerEvents: "none",
//                             }}
//                           >
//                             {values[f.id]}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// Legal Form Filler (Next.js + shadcn-friendly, TailwindCSS)
// Save this file as a React component (e.g. /app/(components)/LegalFormFiller.jsx or /pages/legal-form-filler.jsx)
// Place your scanned template image in the Next.js `public` folder as: /public/templates/ltg-promissory.jpg
// This component renders the scanned image as a *screen-only* background for alignment and
// provides absolutely-positioned inputs that become printable text when you click Print.

"use client";

import React, { useState } from "react";
import { Printer, RotateCcw, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function PromissoryNoteFiller() {
  const [showTemplate, setShowTemplate] = useState(true);
  const [formData, setFormData] = useState<Record<string, string>>({
    date1: "",
    month1: "",
    year1: "",
    php1: "",
    name1: "",
    name2: "",
    amount: "",
    phpAmount: "",
    percent1: "",
    percent2: "",
    processingFee: "",
    venue: "",
    dayOfSigning: "",
    monthOfSigning: "",
    yearMonth: "",
    wittness1: "",
    wittness2: "",

    dayAck: "",
    monthAck: "",
    yearAck: "",
    cityAck: "",
    name3: "",
    name4: "",
    name5: "",
    ctcNo1: "",
    ctcNo2: "",
    ctcNo3: "",
    issuedAt1: "",
    issuedAt2: "",
    issuedAt3: "",
    dateIssued: "",
    yearIssued: "",

    docNo: "",
    pageNo: "",
    bookNo: "",
    seriesOf: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    const emptyData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {} as Record<string, string>);
    setFormData(emptyData);
  };

  return (
    <div className=" bg-gray-100">
      {/* Controls */}
      <div className="print:hidden bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Printer size={18} />
            Print
          </button>
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <button
            onClick={() => setShowTemplate(!showTemplate)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showTemplate ? <EyeOff size={18} /> : <Eye size={18} />}
            {showTemplate ? "Hide" : "Show"} Template
          </button>
        </div>
      </div>

      {/* Legal Size Paper */}
      <div className="flex justify-center p-8 print:p-0">
        <div
          className="bg-white shadow-lg relative print:shadow-none"
          style={{
            width: "8.5in",
            minHeight: "14in",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Background Template Image - Hidden when printing */}
          {showTemplate && (
            <div
              className="absolute inset-0 print:hidden pointer-events-none"
              style={{ width: "8.5in", height: "14in" }}
            >
              <Image
                src="/ltg-promissory-edited17.jpg"
                alt="Template Background"
                width={816}
                height={1344}
                className="w-full h-full opacity-50 relative -top-2"
                style={{ objectFit: "fill" }}
              />
            </div>
          )}

          {/* Fillable Fields - Positioned exactly over template underlines */}
          <div className="relative" style={{ padding: "0.4in 0.5in" }}>
            {/* Top right date: ______, __________, 20__ */}
            <div className="absolute" style={{ top: "111px", right: "54px" }}>
              <div className="flex items-baseline gap-0">
                <input
                  type="text"
                  value={formData.date1}
                  onChange={(e) => updateField("date1", e.target.value)}
                  className="w-10 mr-[3px] border-b border-gray-400 print:border-none text-center bg-transparent focus:outline-none focus:border-blue-500"
                  style={{ fontSize: "10pt" }}
                />
                <input
                  type="text"
                  value={formData.month1}
                  onChange={(e) => updateField("month1", e.target.value)}
                  className="w-[88px] border-b border-gray-400 print:border-none text-center bg-transparent focus:outline-none focus:border-blue-500"
                  style={{ fontSize: "10pt" }}
                />
                <span className="pr-5" style={{ fontSize: "10pt" }}>
                  {" "}
                </span>
                <input
                  type="text"
                  value={formData.year1}
                  onChange={(e) => updateField("year1", e.target.value)}
                  className="w-7 pr-3 border-b border-gray-400 print:border-none text-center bg-transparent focus:outline-none focus:border-blue-500"
                  style={{ fontSize: "10pt" }}
                />
              </div>
            </div>

            {/* Php ____________ */}
            <div className="absolute" style={{ top: "143px", left: "125px" }}>
              <input
                type="text"
                value={formData.php1}
                onChange={(e) => updateField("php1", e.target.value)}
                className="w-24 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>

            {/* I/we, _________________________, _____________________________, */}
            <div className="absolute" style={{ top: "178px", left: "183px" }}>
              <input
                type="text"
                value={formData.name1}
                onChange={(e) => updateField("name1", e.target.value)}
                className="w-48 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "178px", left: "378px" }}>
              <input
                type="text"
                value={formData.name2}
                onChange={(e) => updateField("name2", e.target.value)}
                className="w-52 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>

            {/* the sum of _________________________ pesos (Php ____________ ) */}
            <div className="absolute" style={{ top: "196px", left: "295px" }}>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => updateField("amount", e.target.value)}
                className="w-[185px] text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "196px", left: "557px" }}>
              <input
                type="text"
                value={formData.phpAmount}
                onChange={(e) => updateField("phpAmount", e.target.value)}
                className="w-[93px] text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>

            {/* ________ percent (_____%) */}
            <div className="absolute" style={{ top: "214px", left: "92px" }}>
              <input
                type="text"
                value={formData.percent1}
                onChange={(e) => updateField("percent1", e.target.value)}
                className="w-16 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "214px", left: "210px" }}>
              <input
                type="text"
                value={formData.percent2}
                onChange={(e) => updateField("percent2", e.target.value)}
                className="w-12 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>

            {/* processing fee of Php______, */}
            <div className="absolute" style={{ top: "232px", left: "645px" }}>
              <input
                type="text"
                value={formData.processingFee}
                onChange={(e) => updateField("processingFee", e.target.value)}
                className="w-10 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>

            {/* Venue: ______________________________ */}
            <div className="absolute" style={{ top: "422px", left: "220px" }}>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => updateField("venue", e.target.value)}
                className="w-52 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>

            {/* Promissory Note this _____ day of ____________ in ________________________. */}
            <div className="absolute" style={{ top: "476px", left: "590px" }}>
              <input
                type="text"
                value={formData.dayOfSigning}
                onChange={(e) => updateField("dayOfSigning", e.target.value)}
                className="w-10 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "495px", left: "91px" }}>
              <input
                type="text"
                value={formData.monthOfSigning}
                onChange={(e) => updateField("monthOfSigning", e.target.value)}
                className="w-[93px] text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "495px", left: "202px" }}>
              <input
                type="text"
                value={formData.yearMonth}
                onChange={(e) => updateField("yearMonth", e.target.value)}
                className="w-48 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>

            {/* Witnes 1 and 2 */}
            <div className="absolute" style={{ top: "619px", left: "570px" }}>
              <input
                type="text"
                value={formData.wittness1}
                onChange={(e) => updateField("wittness1", e.target.value)}
                className="w-36 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "625px", left: "152px" }}>
              <input
                type="text"
                value={formData.wittness2}
                onChange={(e) => updateField("wittness2", e.target.value)}
                className="w-36 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>

            {/* Acknowledgment section */}
            {/* BEFORE ME, this ____ day of ________, 20___ in ________________________, */}
            {/* <div className="absolute" style={{ top: "791px", left: "241px" }}>
              <input
                type="text"
                value={formData.dayAck}
                onChange={(e) => updateField("dayAck", e.target.value)}
                className="w-8 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "791px", left: "312px" }}>
              <input
                type="text"
                value={formData.monthAck}
                onChange={(e) => updateField("monthAck", e.target.value)}
                className="w-16 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "791px", left: "400px" }}>
              <input
                type="text"
                value={formData.yearAck}
                onChange={(e) => updateField("yearAck", e.target.value)}
                className="w-5 text-center border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "791px", left: "440px" }}>
              <input
                type="text"
                value={formData.cityAck}
                onChange={(e) => updateField("cityAck", e.target.value)}
                className="w-48 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div> */}

            {/* personally appeared ______________________, __________________, ____________________ */}
            {/* <div className="absolute" style={{ top: "821px", left: "172px" }}>
              <input
                type="text"
                value={formData.name3}
                onChange={(e) => updateField("name3", e.target.value)}
                className="w-44 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "821px", left: "426px" }}>
              <input
                type="text"
                value={formData.name4}
                onChange={(e) => updateField("name4", e.target.value)}
                className="w-36 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "821px", left: "612px" }}>
              <input
                type="text"
                value={formData.name5}
                onChange={(e) => updateField("name5", e.target.value)}
                className="w-36 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div> */}

            {/* with CTC Nos.____________________, ____________________, ____________________, */}
            {/* <div className="absolute" style={{ top: "840px", left: "115px" }}>
              <input
                type="text"
                value={formData.ctcNo1}
                onChange={(e) => updateField("ctcNo1", e.target.value)}
                className="w-36 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "840px", left: "274px" }}>
              <input
                type="text"
                value={formData.ctcNo2}
                onChange={(e) => updateField("ctcNo2", e.target.value)}
                className="w-36 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "840px", left: "433px" }}>
              <input
                type="text"
                value={formData.ctcNo3}
                onChange={(e) => updateField("ctcNo3", e.target.value)}
                className="w-36 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div> */}

            {/* issued at, ____________________, ____________________, ____________________ */}
            {/* <div className="absolute" style={{ top: "859px", left: "48px" }}>
              <input
                type="text"
                value={formData.issuedAt1}
                onChange={(e) => updateField("issuedAt1", e.target.value)}
                className="w-36 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "859px", left: "207px" }}>
              <input
                type="text"
                value={formData.issuedAt2}
                onChange={(e) => updateField("issuedAt2", e.target.value)}
                className="w-36 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "859px", left: "366px" }}>
              <input
                type="text"
                value={formData.issuedAt3}
                onChange={(e) => updateField("issuedAt3", e.target.value)}
                className="w-36 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div> */}

            {/* on ______________, 20__, */}
            {/* <div className="absolute" style={{ top: "878px", left: "48px" }}>
              <input
                type="text"
                value={formData.dateIssued}
                onChange={(e) => updateField("dateIssued", e.target.value)}
                className="w-28 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div>
            <div className="absolute" style={{ top: "878px", left: "133px" }}>
              <input
                type="text"
                value={formData.yearIssued}
                onChange={(e) => updateField("yearIssued", e.target.value)}
                className="w-8 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                style={{ fontSize: "10pt" }}
              />
            </div> */}

            {/* Bottom section */}
            {/* <div className="absolute" style={{ top: "1125px", left: "48px" }}>
              <div className="mb-1">
                <span>Doc No. </span>
                <input
                  type="text"
                  value={formData.docNo}
                  onChange={(e) => updateField("docNo", e.target.value)}
                  className="w-32 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                  style={{ fontSize: "10pt" }}
                />
              </div>
              <div className="mb-1">
                <span>Page No. </span>
                <input
                  type="text"
                  value={formData.pageNo}
                  onChange={(e) => updateField("pageNo", e.target.value)}
                  className="w-32 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                  style={{ fontSize: "10pt" }}
                />
              </div>
              <div className="mb-1">
                <span>Book No. </span>
                <input
                  type="text"
                  value={formData.bookNo}
                  onChange={(e) => updateField("bookNo", e.target.value)}
                  className="w-32 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                  style={{ fontSize: "10pt" }}
                />
              </div>
              <div>
                <span>Series of 20</span>
                <input
                  type="text"
                  value={formData.seriesOf}
                  onChange={(e) => updateField("seriesOf", e.target.value)}
                  className="w-8 border-b border-gray-400 print:border-none bg-transparent focus:outline-none focus:border-blue-500"
                  style={{ fontSize: "10pt" }}
                />
              </div>
            </div> */}
          </div>

          {/* Print styles */}
          <style>{`
            @media print {
              body { margin: 0; padding: 0; }
              @page { size: legal; margin: 0; }
              input { 
                font-family: Arial, sans-serif !important;
                color: black !important;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
