import { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";
import { useLanguage } from "../context/LanguageContext";

const homeContents = {
  mn: {
    hero: {
      eyebrow: "DAAS PLATFORM",
      title: "Мэдээлэлд суурилсан шийдвэр",
      titleHighlight: "нэг харцаар.",
      description:
        "Сар бүрийн Excel тайланг хүлээхээ боль — шийдвэрээ шууд гарга.",
      beforeLabel: "ӨМНӨ · EXCEL",
      afterLabel: "ДАРАА · DATAVIEW",
      compareHint: "↔ Чирж харьцуулах ↔",
      previewTitle: "DataView Mongolia",
      period: "2024 оны 12-р сар",
      barChartTitle: "Сар бүрийн борлуулалт",
      sales: "Борлуулалт",
      vat: "НӨАТ",
      electronics: "Электроникс",
      previousMonth: "Өмнөх сар (11-р сар)",
      previousYear: "Өмнөх жил (2023/12)",
      afterExpenses: "Зардлаа хассан",
      confirmed: "Нийт баталгаажсан",
      previewKpis: [
        {
          label: "НИЙТ БОРЛУУЛАЛТ",
          value: "₮ 2,847.6M",
        },
        {
          label: "НӨАТ ТАТВАР",
          value: "₮ 284.8M",
        },
        {
          label: "ИДЭВХТЭЙ ЗАХИАЛГА",
          value: "3,284",
        },
        {
          label: "ЦЭВЭР АШИГ",
          value: "₮ 712.4M",
        },
      ],
    },

    excel: {
      file: "Файл",
      edit: "Засах",
      view: "Харах",
      insert: "Оруулах",
      product: "Бараа",
      unitPrice: "Нэгж үнэ",
      quantity: "Тоо",
      total: "Нийт",
      vat: "НӨАТ",
      amount: "Дүн",
      date: "Огноо",
      order: "Захиалга",
      grandTotal: "НИЙТ",
      check: "ШАЛГАЛТ",
      urgent: "ЯАРАЛТАЙ!",
      note: "D баганын алдааг засах хэрэгтэй...",
      compareLabel: "Excel болон DataView харьцуулах",
    },

    problem: {
      kicker: "АСУУДАЛ",
      title: "Та одоо хэрхэн шийдвэр гаргаж байна вэ?",
      items: [
        {
          icon: "◷",
          title: "Хуучирсан мэдээлэл",
          description:
            "Шийдвэр гаргах үед мэдээлэл аль хэдийн хуучирсан байдаг",
        },
        {
          icon: "✎",
          title: "Гар ажиллагаа, алдаа ихтэй",
          description:
            "Нэг нүдний алдаа бүх тайлангаар дамжин тархдаг",
        },
        {
          icon: "⚡",
          title: "Бодит цагийн мэдээлэл байхгүй",
          description:
            "Өнөөдрийн борлуулалт, мөнгөн үлдэгдэл хэд вэ? Хэн ч шууд хариулж чадахгүй",
        },
      ],
    },

    templates: {
      kicker: "ШИЙДЭЛ",
      title: "Туршигдсан 5 загвар — тэгээс эхлэх шаардлагагүй",
      note:
        "Загвар бүр бүрэн монгол хэлээр, гар утас болон компьютер дээр ажиллана.",
      items: [
        {
          icon: "🏢",
          title: "Захирлын тойм (CEO)",
          description:
            "Компанийн гол үзүүлэлт — орлого, ашиг, зардлыг нэг дороос харна",
          className: "template-cyan",
        },
        {
          icon: "💰",
          title: "Санхүү",
          description:
            "Ашиг алдагдлын тайлан, зардлын бүтэц, НӨАТ, улирлын харьцуулалт",
          className: "template-blue",
        },
        {
          icon: "📈",
          title: "Борлуулалт",
          description:
            "Борлуулалтын дүн, бүтээгдэхүүн, борлуулалтын менежерийн гүйцэтгэл",
          className: "template-orange",
        },
        {
          icon: "🧾",
          title: "Авлага, Өглөг (AR/AP)",
          description:
            "Авлагын насжилт, үлдэгдэл, харилцагчийн тооцооны байдал",
          className: "template-purple",
        },
        {
          icon: "📦",
          title: "Мөнгөн урсгал",
          description:
            "Мөнгөн орлого, зарлага, үлдэгдлийн чиг хандлага, дараа сарын таамаг",
          className: "template-green",
        },
      ],
    },

    benefits: {
      kicker: "ЯАГААД DATAVIEW?",
      title: "Бид юугаараа ялгаатай вэ?",
      items: [
        {
          icon: "🌐",
          title: "Бүрэн монгол хэлээр",
          description:
            "Тайлан, дашбоард, дэмжлэг — бүгд монгол хэлээр",
        },
        {
          icon: "▱",
          title: "Бэлэн 5 загвар",
          description:
            "Тэгээс эхлэхгүй — туршигдсан загвараас сонгоно",
        },
        {
          icon: "♙",
          title: "Бид холболтыг хариуцна",
          description:
            "IT мэдлэг эсвэл тусдаа аналитикч шаардлагагүй",
        },
        {
          icon: "⚡",
          title: "Олон сарын төсөл биш",
          description:
            "Дотоод BI баг шинээр байгуулахаас хавьгүй хурдан",
        },
        {
          icon: "▤",
          title: "Ямар ч дата эх үүсвэртэй",
          description:
            "Oracle, Excel, 1C болон бусад системтэй ажиллана",
        },
        {
          icon: "$",
          title: "ЖДБ-ийн төсөвт тохирно",
          description:
            "Нэмэлт BI лиценз болон аналитикч авах шаардлагагүй",
        },
      ],
    },

    steps: {
      kicker: "ХЭРХЭН АЖИЛЛАДАГ",
      title: "4 энгийн алхам",
      note:
        "Танай талаас зөвхөн шаардлагатай хандалтыг өгөхөд хангалттай.",
      items: [
        {
          number: "①",
          title: "Зөвлөгөө",
          description:
            "Маягт бөглөх эсвэл бидэн рүү залгаж Odoo, 1C, Excel зэрэг ашигладаг системийнхээ талаар хэлнэ. 1 минут.",
        },
        {
          number: "②",
          title: "Дата холболт",
          description:
            "Бид зөвхөн унших эрхээр холбогдож, таны өгөгдлийн чанарыг үнэлнэ.",
        },
        {
          number: "③",
          title: "Дашбоард бүтээнэ",
          description:
            "Сонгосон загварыг бодит датагаар дүүргэж, бүх үзүүлэлтийг шалгана.",
        },
        {
          number: "④",
          title: "Танилцуулга ба нэвтрэх",
          description:
            "Demo танилцуулга хийж, тохиргоог эцэслээд та өөрийн эрхээр нэвтэрнэ.",
        },
      ],
    },

    guarantee: {
      kicker: "БИДНИЙ БАТАЛГАА",
      title: "Яагаад бидэнд итгэж болох вэ?",
      items: [
        {
          icon: "♙",
          title: "Туршлагатай баг",
          description:
            "Санхүүгийн салбарт 5+ жилийн туршлагатай дата инженерийн баг — банкны ETL, Power BI болон санхүүгийн тайлангийн системүүд дээр ажилласан туршлагатай.",
        },
        {
          icon: "✓",
          title: "Бодит датагаар туршигдсан",
          description:
            "Манай 5 загвар Монголын компаниудын бодит санхүүгийн дата — НӨАТ, улирлын хэлбэлзэл, Цагаан сарын нөлөөлөл зэрэг нөхцөл дээр туршигдсан.",
        },
      ],
    },

    faq: {
      kicker: "ТҮГЭЭМЭЛ АСУУЛТ",
      title: "Асуулт хариулт",
      items: [
        {
          question: "Ямар системтэй ажилладаг вэ?",
          answer:
            "Oracle, Excel, 1C, Odoo, PostgreSQL, MS SQL болон бусад өгөгдлийн эх үүсвэртэй холбогдох боломжтой.",
        },
        {
          question: "Хэр хурдан бэлэн болох вэ?",
          answer:
            "Хугацаа нь дата эх үүсвэр, дата чанар болон сонгосон загвараас хамаарна. Анхны үнэлгээний дараа хэрэгжүүлэх хугацааг тодорхой өгнө.",
        },
        {
          question: "Манай IT баг юу хийх хэрэгтэй вэ?",
          answer:
            "Шаардлагатай дата эх үүсвэрт зөвхөн унших эрх бүхий хандалт өгөхөд хангалттай.",
        },
        {
          question: "Дата аюулгүй байдал хэрхэн хангагддаг вэ?",
          answer:
            "Read-only хандалт, эрхийн удирдлага болон хамгаалалттай холболтыг ашиглан байгууллагын шаардлагад нийцүүлэн тохируулна.",
        },
        {
          question: "Загвараа өөрчилж болох уу?",
          answer:
            "Тийм. KPI, хүснэгт, график болон дашбоардын бүтцийг байгууллагын хэрэгцээнд тохируулж болно.",
        },
        {
          question: "Гэрээгээ цуцалж болох уу?",
          answer:
            "Тийм. Үйлчилгээний гэрээнд заасан нөхцөлийн дагуу цуцлах боломжтой.",
        },
      ],
    },

    contact: {
      kicker: "ХОЛБОО БАРИХ",
      title: "Бидэнтэй холбогдох",
      description:
        "Маягтыг бөглөж илгээнэ үү — бид 1–3 ажлын өдрийн дотор хариу өгнө.",
      name: "Нэр",
      namePlaceholder: "Бат-Эрдэнэ",
      company: "Компани",
      companyPlaceholder: "ХХК нэр",
      phoneLabel: "Утас",
      phonePlaceholder: "+976 9900 0000",
      emailLabel: "Имэйл",
      emailPlaceholder: "email@company.mn",
      system: "Ашигладаг систем",
      select: "Сонгох...",
      interestedTemplate: "Сонирхсон загвар",
      phone: "+976 7700 0000",
      email: "hello@dataview.mn",
      addressLabel: "Хаяг",
      address: "Улаанбаатар, Хан-Уул дүүрэг",
      submitButton: "Илгээх →",
      sending: "Илгээж байна...",
      required:
        "Нэр, компани, утас, имэйлээ бүрэн оруулна уу.",
      success: "Хүсэлт амжилттай илгээгдлээ.",
      error: "Хүсэлт илгээхэд алдаа гарлаа.",
      options: [
        "CEO",
        "Санхүү",
        "Борлуулалт",
        "Авлага, Өглөг",
        "Мөнгөн урсгал",
        "Бүгд",
      ],
    },
  },

  en: {
    hero: {
      eyebrow: "DAAS PLATFORM",
      title: "Data-driven decisions",
      titleHighlight: "at a glance.",
      description:
        "Stop waiting for the monthly Excel report — make your decision instantly.",
      beforeLabel: "BEFORE · EXCEL",
      afterLabel: "AFTER · DATAVIEW",
      compareHint: "↔ Drag to compare ↔",
      previewTitle: "DataView Mongolia",
      period: "December 2024",
      barChartTitle: "Monthly Sales",
      sales: "Sales",
      vat: "VAT",
      electronics: "Electronics",
      previousMonth: "Previous month (Nov)",
      previousYear: "Previous year (Dec 2023)",
      afterExpenses: "After expenses",
      confirmed: "Total confirmed",
      previewKpis: [
        {
          label: "TOTAL SALES",
          value: "₮ 2,847.6M",
        },
        {
          label: "VAT TAX",
          value: "₮ 284.8M",
        },
        {
          label: "ACTIVE ORDERS",
          value: "3,284",
        },
        {
          label: "NET PROFIT",
          value: "₮ 712.4M",
        },
      ],
    },

    excel: {
      file: "File",
      edit: "Edit",
      view: "View",
      insert: "Insert",
      product: "Item",
      unitPrice: "Unit price",
      quantity: "Qty",
      total: "Total",
      vat: "VAT",
      amount: "Amount",
      date: "Date",
      order: "Order",
      grandTotal: "TOTAL",
      check: "CHECK",
      urgent: "URGENT!",
      note: "Need to fix the error in column D...",
      compareLabel: "Compare Excel and DataView",
    },

    problem: {
      kicker: "PROBLEM",
      title: "How are you making decisions right now?",
      items: [
        {
          icon: "◷",
          title: "Outdated information",
          description:
            "By the time a decision is made, the data is already stale",
        },
        {
          icon: "✎",
          title: "Manual work, error-prone",
          description:
            "One cell error propagates through the entire report",
        },
        {
          icon: "⚡",
          title: "No real-time data",
          description:
            "What are today's sales or cash balance? Nobody can answer",
        },
      ],
    },

    templates: {
      kicker: "SOLUTION",
      title: "5 proven templates — no need to start from zero",
      note:
        "Each template is fully in Mongolian, on both mobile and desktop.",
      items: [
        {
          icon: "🏢",
          title: "Executive Overview (CEO)",
          description:
            "Company's key metrics — revenue, profit, and expenses at a glance",
          className: "template-cyan",
        },
        {
          icon: "💰",
          title: "Finance",
          description:
            "Profit & loss statement, cost structure, VAT, quarterly comparisons",
          className: "template-blue",
        },
        {
          icon: "📈",
          title: "Sales",
          description:
            "Sales figures, products, sales manager performance",
          className: "template-orange",
        },
        {
          icon: "🧾",
          title: "Receivables & Payables (AR/AP)",
          description:
            "Receivables aging, balances, customer account status",
          className: "template-purple",
        },
        {
          icon: "📦",
          title: "Cash Flow",
          description:
            "Cash inflow/outflow, balance trends, next month's forecast",
          className: "template-green",
        },
      ],
    },

    benefits: {
      kicker: "WHY DATAVIEW?",
      title: "What sets us apart",
      items: [
        {
          icon: "🌐",
          title: "Fully in Mongolian",
          description:
            "Reports, dashboards, support — all in Mongolian",
        },
        {
          icon: "▱",
          title: "5 ready-made templates",
          description:
            "No starting from scratch; choose from proven templates",
        },
        {
          icon: "♙",
          title: "We handle the integration",
          description:
            "No IT knowledge or analyst required",
        },
        {
          icon: "⚡",
          title: "Not a months-long project",
          description:
            "Far faster than building an in-house BI team",
        },
        {
          icon: "▤",
          title: "Works with any data source",
          description:
            "Oracle, Excel, 1C — works with any system",
        },
        {
          icon: "$",
          title: "Fits an SME budget",
          description:
            "No BI licenses or analyst hires needed",
        },
      ],
    },

    steps: {
      kicker: "HOW IT WORKS",
      title: "4 simple steps",
      note: "All we need from you is to grant access.",
      items: [
        {
          number: "①",
          title: "Consultation",
          description:
            "Fill out the form or call us and tell us about your system (Odoo/1C/Excel). 1 minute.",
        },
        {
          number: "②",
          title: "Data connection",
          description:
            "We connect with read-only access and assess your data quality.",
        },
        {
          number: "③",
          title: "Dashboard build",
          description:
            "We populate your chosen template with real data and verify the figures.",
        },
        {
          number: "④",
          title: "Onboarding & login",
          description:
            "We run a demo, finalize the setup, and you log in with your own account.",
        },
      ],
    },

    guarantee: {
      kicker: "OUR GUARANTEE",
      title: "Why you can trust us now",
      items: [
        {
          icon: "♙",
          title: "Team experience",
          description:
            "A data engineering team with 5+ years in the financial sector — having worked on bank ETL, Power BI, and financial reporting systems.",
        },
        {
          icon: "✓",
          title: "Tested with real data",
          description:
            "Our 5 templates have been tested on real Mongolian company financial data, including VAT, seasonal patterns, and Lunar New Year effects.",
        },
      ],
    },

    faq: {
      kicker: "FREQUENTLY ASKED QUESTIONS",
      title: "Q&A",
      items: [
        {
          question: "What systems does it work with?",
          answer:
            "We can connect to Oracle, Excel, 1C, Odoo, PostgreSQL, MS SQL, and other data sources.",
        },
        {
          question: "How quickly will it be ready?",
          answer:
            "Timing depends on your data source, data quality, and selected template. We provide a clear implementation timeline after the initial assessment.",
        },
        {
          question: "What does our IT team need to do?",
          answer:
            "Your team only needs to provide the required read-only access to the data source.",
        },
        {
          question: "How is data security ensured?",
          answer:
            "We use read-only access, access controls, and secure connections configured according to your organization's requirements.",
        },
        {
          question: "Can we customize the template?",
          answer:
            "Yes. KPIs, tables, charts, and dashboard structure can be customized for your organization's needs.",
        },
        {
          question: "Can we cancel the contract?",
          answer:
            "Yes. The service can be cancelled according to the terms defined in your service agreement.",
        },
      ],
    },

    contact: {
      kicker: "CONTACT US",
      title: "Get in touch with us",
      description:
        "Fill out the form and send it — we'll respond within 1–3 business days.",
      name: "Name",
      namePlaceholder: "Bat-Erdene",
      company: "Company",
      companyPlaceholder: "LLC name",
      phoneLabel: "Phone",
      phonePlaceholder: "+976 9900 0000",
      emailLabel: "Email",
      emailPlaceholder: "email@company.mn",
      system: "System you use",
      select: "Select...",
      interestedTemplate: "Template of interest",
      phone: "+976 7700 0000",
      email: "hello@dataview.mn",
      addressLabel: "Address",
      address: "Ulaanbaatar, Khan-Uul District",
      submitButton: "Send →",
      sending: "Sending...",
      required:
        "Please enter your name, company, phone number, and email.",
      success: "Your request was sent successfully.",
      error: "An error occurred while sending your request.",
      options: [
        "CEO",
        "Finance",
        "Sales",
        "AR/AP",
        "Cash Flow",
        "All",
      ],
    },
  },
};

function Home() {
  const { language } = useLanguage();

  const homeContent = homeContents[language];

  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [comparePosition, setComparePosition] = useState(50);

  const templateOptions = homeContent.contact.options;
  const allOption = language === "mn" ? "Бүгд" : "All";

  const excelRows = [
    [
      language === "mn" ? "Компьютер" : "Computer",
      "1,250,000",
      "12",
      "#REF!",
      "150,000",
      "#DIV/0!",
      "2024-01-15",
      "ORD-2401",
    ],
    [
      language === "mn" ? "Принтер" : "Printer",
      "480,000",
      "5",
      "2,400,000",
      "288,000",
      "2,688,000",
      "2024-01-16",
      "ORD-2402",
    ],
    [
      language === "mn" ? "Монитор" : "Monitor",
      "620,000",
      "8",
      "4,960,000",
      "#VALUE!",
      "???",
      "???",
      "ORD-2403",
    ],
    [
      "Keyboard",
      "45,000",
      "50",
      "2,250,000",
      "270,000",
      "2,520,000",
      "2024-01-18",
      "ORD-2404",
    ],
    [
      "Mouse",
      "38,000",
      "100",
      "1,900,000",
      "228,000",
      "2,128,000",
      "2024-01-18",
      "ORD-2405",
    ],
    [
      "SSD 512GB",
      "185,000",
      "20",
      "#REF!",
      "222,000",
      "#DIV/0!",
      "2024-01-19",
      "ORD-2406",
    ],
    [
      "RAM 16GB",
      "120,000",
      "15",
      "1,800,000",
      "216,000",
      "2,016,000",
      "2024-01-20",
      "ORD-2407",
    ],
    [
      language === "mn" ? "Роутер" : "Router",
      "95,000",
      "10",
      "950,000",
      "114,000",
      "1,064,000",
      "2024-01-21",
      "ORD-2408",
    ],
    [
      language === "mn" ? "Веб камер" : "Web camera",
      "75,000",
      "25",
      "1,875,000",
      "225,000",
      "2,100,000",
      "2024-01-22",
      "ORD-2409",
    ],
    [
      "UPS",
      "320,000",
      "6",
      "#REF!",
      "230,400",
      "#VALUE!",
      "2024-01-23",
      "ORD-2410",
    ],
    [
      language === "mn" ? "Утас" : "Phone",
      "890,000",
      "3",
      "2,670,000",
      "320,400",
      "2,990,400",
      "2024-01-24",
      "ORD-2411",
    ],
    [
      language === "mn" ? "Принтер тоо" : "Printer qty",
      "150,000",
      "4",
      "600,000",
      "72,000",
      "672,000",
      "???",
      "ORD-2412",
    ],
  ];

  useEffect(() => {
    setSelectedTemplates([]);
  }, [language]);

  useEffect(() => {
    if (!requestMessage) return;

    const timer = setTimeout(() => {
      setRequestMessage("");
      setRequestSuccess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [requestMessage]);

  const toggleTemplate = (template) => {
    if (template === allOption) {
      const individualTemplates = templateOptions.filter(
        (item) => item !== allOption
      );

      setSelectedTemplates((current) =>
        current.length === individualTemplates.length
          ? []
          : individualTemplates
      );

      return;
    }

    setSelectedTemplates((current) =>
      current.includes(template)
        ? current.filter((item) => item !== template)
        : [...current, template]
    );
  };

  const isAllSelected =
    selectedTemplates.length === templateOptions.length - 1;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    try {
      setSendingRequest(true);
      setRequestMessage("");
      setRequestSuccess(false);

      const formData = new FormData(formElement);

      const name = formData.get("name")?.trim();
      const company = formData.get("company")?.trim();
      const phone = formData.get("phone")?.trim();
      const email = formData.get("email")?.trim();
      const systemType = formData.get("system");

      if (!name || !company || !phone || !email) {
        throw new Error(homeContent.contact.required);
      }

      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          phone,
          email,
          system_type: systemType || null,
          models: selectedTemplates,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP ${response.status}`
        );
      }

      setRequestSuccess(true);

      setRequestMessage(
        result.message || homeContent.contact.success
      );

      formElement.reset();
      setSelectedTemplates([]);
    } catch (error) {
      setRequestSuccess(false);

      setRequestMessage(
        error.message || homeContent.contact.error
      );
    } finally {
      setSendingRequest(false);
    }
  };

  return (
    <div className="home-page">
      <Navbar />

      <main>
        <section className="landing-hero landing-compare-hero">
          <div className="landing-container compare-hero-container">
            <div className="compare-hero-heading">
              <div className="compare-eyebrow">
                <span />
                {homeContent.hero.eyebrow}
              </div>

              <h1>
                {homeContent.hero.title} —{" "}
                <span className="compare-gradient-text">
                  {homeContent.hero.titleHighlight}
                </span>
              </h1>

              <p>{homeContent.hero.description}</p>
            </div>

            <div className="compare-labels">
              <span className="compare-label before">
                <i />
                {homeContent.hero.beforeLabel}
              </span>

              <span className="compare-label after">
                <i />
                {homeContent.hero.afterLabel}
              </span>
            </div>

            <div
              className="before-after-demo"
              style={{
                "--compare-position": `${comparePosition}%`,
              }}
            >
              <div className="compare-layer compare-excel-layer">
                <div className="excel-side">
                  <div className="excel-toolbar">
                    <strong>Excel</strong>
                    <span>|</span>
                    <span>{homeContent.excel.file}</span>
                    <span>{homeContent.excel.edit}</span>
                    <span>{homeContent.excel.view}</span>
                    <span>{homeContent.excel.insert}</span>
                  </div>

                  <div className="excel-formula">
                    <span>D4</span>
                    <strong>=#REF!</strong>
                  </div>

                  <div className="excel-table">
                    <table>
                      <thead>
                        <tr>
                          <th>{homeContent.excel.product}</th>
                          <th>{homeContent.excel.unitPrice}</th>
                          <th>{homeContent.excel.quantity}</th>
                          <th>{homeContent.excel.total}</th>
                          <th>{homeContent.excel.vat}</th>
                          <th>{homeContent.excel.amount}</th>
                          <th>{homeContent.excel.date}</th>
                          <th>{homeContent.excel.order}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {excelRows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                              const error =
                                String(cell).includes("#") ||
                                String(cell).includes("???");

                              return (
                                <td
                                  key={cellIndex}
                                  className={
                                    error ? "excel-error" : ""
                                  }
                                >
                                  {cell}
                                </td>
                              );
                            })}
                          </tr>
                        ))}

                        <tr className="excel-total">
                          <td>{homeContent.excel.grandTotal}</td>
                          <td />
                          <td />
                          <td>=SUM(D2:D13)</td>
                          <td />
                          <td>=SUM(F2:F13)</td>
                          <td />
                          <td />
                        </tr>

                        <tr className="excel-total">
                          <td>{homeContent.excel.check}</td>
                          <td />
                          <td />
                          <td className="excel-error">#REF!</td>
                          <td />
                          <td className="excel-error">#REF!</td>
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="excel-note">
                    <strong>{homeContent.excel.urgent}</strong>
                    <span>{homeContent.excel.note}</span>
                    <b>☎</b>
                  </div>
                </div>
              </div>

              <div className="compare-layer compare-dataview-layer">
                <div className="dataview-side">
                  <div className="dataview-topbar">
                    <div className="dataview-brand">
                      <div className="dataview-app-icon">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>

                      <strong>
                        {homeContent.hero.previewTitle}
                      </strong>
                    </div>

                    <div className="dataview-topbar-right">
                      <div className="dataview-period">
                        {homeContent.hero.period}
                      </div>

                      <div className="dataview-user">
                        D
                      </div>
                    </div>
                  </div>

                  <div className="dataview-dashboard dataview-dashboard-dark">
                    <div className="dataview-kpis">
                      {homeContent.hero.previewKpis.map(
                        (item, index) => (
                          <div
                            className="dark-kpi"
                            key={index}
                          >
                            <div className="dark-kpi-top">
                              <div>
                                <small>{item.label}</small>

                                <span>
                                  {index === 3
                                    ? homeContent.hero.afterExpenses
                                    : index === 2
                                      ? homeContent.hero.confirmed
                                      : homeContent.hero.period}
                                </span>
                              </div>

                              <svg
                                viewBox="0 0 90 32"
                                className="kpi-sparkline"
                              >
                                <polyline
                                  points="0,27 10,21 18,23 29,14 40,16 51,9 62,12 72,5 80,8 90,1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>

                            <strong>{item.value}</strong>

                            <div className="kpi-comparison">
                              <div>
                                <span>
                                  {homeContent.hero.previousMonth}
                                </span>

                                <span className="kpi-old-value">
                                  {index === 0
                                    ? "₮ 2,541.2M"
                                    : index === 1
                                      ? "₮ 254.3M"
                                      : index === 2
                                        ? "2,971"
                                        : "₮ 504.2M"}
                                </span>

                                <b>
                                  ▲{" "}
                                  {index === 2
                                    ? "10.5%"
                                    : index === 3
                                      ? "41.3%"
                                      : "12.1%"}
                                </b>
                              </div>

                              <div>
                                <span>
                                  {homeContent.hero.previousYear}
                                </span>

                                <span className="kpi-old-value">
                                  {index === 0
                                    ? "₮ 2,190.4M"
                                    : index === 1
                                      ? "₮ 219.0M"
                                      : index === 2
                                        ? "2,648"
                                        : "₮ 504.2M"}
                                </span>

                                <b>
                                  ▲{" "}
                                  {index === 2
                                    ? "24.0%"
                                    : index === 3
                                      ? "41.3%"
                                      : "30.0%"}
                                </b>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="dashboard-bottom-row">
                      <div className="dark-chart-card">
                        <div className="dark-chart-heading">
                          <strong>
                            {homeContent.hero.barChartTitle}
                          </strong>

                          <div>
                            <span className="legend-sales">
                              ● {homeContent.hero.sales}
                            </span>

                            <span className="legend-tax">
                              ● {homeContent.hero.vat}
                            </span>
                          </div>
                        </div>

                        <div className="dark-bars">
                          {[
                            45,
                            38,
                            52,
                            61,
                            55,
                            68,
                            48,
                            72,
                            66,
                            77,
                            73,
                            88,
                          ].map((height, index) => (
                            <div
                              className="dark-bar-group"
                              key={index}
                            >
                              <span
                                className="sales-bar"
                                style={{
                                  height: `${height}%`,
                                }}
                              />

                              <span
                                className="tax-bar"
                                style={{
                                  height: `${Math.max(
                                    6,
                                    height * 0.12
                                  )}%`,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="dark-donut-card">
                        <div className="dark-donut">
                          <div>
                            <strong>36%</strong>
                            <span>
                              {homeContent.hero.electronics}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <input
                className="compare-range"
                type="range"
                min="0"
                max="100"
                value={comparePosition}
                onChange={(event) =>
                  setComparePosition(
                    Number(event.target.value)
                  )
                }
                onWheel={(event) => {
                  const dashboard =
                    event.currentTarget.parentElement?.querySelector(
                      ".dataview-dashboard"
                    );

                  if (dashboard) {
                    dashboard.scrollTop += event.deltaY;
                  }
                }}
                aria-label={homeContent.excel.compareLabel}
              />

              <div className="compare-divider">
                <button type="button" tabIndex="-1">
                  ↔
                </button>
              </div>
            </div>

            <div className="compare-hint">
              {homeContent.hero.compareHint}
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.problem.kicker}
              </span>

              <h2>{homeContent.problem.title}</h2>
            </div>

            <div className="problem-grid">
              {homeContent.problem.items.map(
                (item, index) => (
                  <div
                    className="problem-card"
                    key={index}
                  >
                    <div className="problem-icon">
                      {item.icon}
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section
          className="section templates-section"
          id="templates"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.templates.kicker}
              </span>

              <h2>{homeContent.templates.title}</h2>
            </div>

            <div className="template-grid">
              {homeContent.templates.items.map(
                (item, index) => (
                  <div
                    key={index}
                    className={`template-card ${
                      item.className || ""
                    }`}
                  >
                    <div className="template-visual">
                      <div className="template-icon">
                        {item.icon}
                      </div>
                    </div>

                    <div className="template-body">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>

                      <button type="button">
                        {homeContent.templates.detailButton}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            <p className="templates-note">
              {homeContent.templates.note}
            </p>
          </div>
        </section>

        <section
          className="section section-soft"
          id="why-dataview"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.benefits.kicker}
              </span>

              <h2>{homeContent.benefits.title}</h2>
            </div>

            <div className="benefits-grid">
              {homeContent.benefits.items.map(
                (item, index) => (
                  <div
                    className="benefit-card"
                    key={index}
                  >
                    <div className="benefit-icon">
                      {item.icon}
                    </div>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section
          className="section steps-section"
          id="how-it-works"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.steps.kicker}
              </span>

              <h2>{homeContent.steps.title}</h2>
            </div>

            <div className="steps-grid">
              {homeContent.steps.items.map(
                (item, index) => (
                  <Fragment key={index}>
                    <div className="step-item">
                      <div className="step-number">
                        {item.number}
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    {index <
                      homeContent.steps.items.length - 1 && (
                      <div className="step-line" />
                    )}
                  </Fragment>
                )
              )}
            </div>

            <p className="steps-note">
              {homeContent.steps.note}
            </p>
          </div>
        </section>

        <section
          className="section testimonials-section"
          id="guarantee"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.guarantee.kicker}
              </span>

              <h2>{homeContent.guarantee.title}</h2>
            </div>

            <div className="testimonial-grid">
              {homeContent.guarantee.items.map(
                (item, index) => (
                  <div
                    className="testimonial-card"
                    key={index}
                  >
                    <div className="quote-mark">
                      {item.icon}
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="landing-container faq-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.faq.kicker}
              </span>

              <h2>{homeContent.faq.title}</h2>
            </div>

            <div className="faq-list">
              {homeContent.faq.items.map(
                (item, index) => (
                  <details
                    key={`${language}-${index}`}
                    className="faq-item"
                  >
                    <summary>
                      {item.question}
                      <span>⌄</span>
                    </summary>

                    <p>{item.answer}</p>
                  </details>
                )
              )}
            </div>
          </div>
        </section>

        <section
          className="section contact-section"
          id="contact"
        >
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-kicker">
                {homeContent.contact.kicker}
              </span>

              <h2>{homeContent.contact.title}</h2>

              <p>{homeContent.contact.description}</p>
            </div>

            <div className="contact-layout">
              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <label>
                    {homeContent.contact.name}

                    <input
                      type="text"
                      name="name"
                      placeholder={
                        homeContent.contact.namePlaceholder
                      }
                      required
                    />
                  </label>

                  <label>
                    {homeContent.contact.company}

                    <input
                      type="text"
                      name="company"
                      placeholder={
                        homeContent.contact.companyPlaceholder
                      }
                      required
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    {homeContent.contact.phoneLabel}

                    <input
                      type="tel"
                      name="phone"
                      placeholder={
                        homeContent.contact.phonePlaceholder
                      }
                      required
                    />
                  </label>

                  <label>
                    {homeContent.contact.emailLabel}

                    <input
                      type="email"
                      name="email"
                      placeholder={
                        homeContent.contact.emailPlaceholder
                      }
                      required
                    />
                  </label>
                </div>

                <label>
                  {homeContent.contact.system}

                  <select
                    name="system"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {homeContent.contact.select}
                    </option>

                    <option value="Excel">Excel</option>
                    <option value="Odoo">Odoo</option>
                    <option value="1C">1C</option>
                    <option value="Oracle">Oracle</option>
                    <option value="PostgreSQL">
                      PostgreSQL
                    </option>
                    <option value="MS SQL">
                      MS SQL
                    </option>
                  </select>
                </label>

                <div className="interest-label">
                  {homeContent.contact.interestedTemplate}
                </div>

                <div className="interest-buttons">
                  {templateOptions.map((template) => {
                    const selected =
                      template === allOption
                        ? isAllSelected
                        : selectedTemplates.includes(
                            template
                          );

                    return (
                      <button
                        key={template}
                        type="button"
                        className={
                          selected ? "selected" : ""
                        }
                        onClick={() =>
                          toggleTemplate(template)
                        }
                        aria-pressed={selected}
                      >
                        {selected && (
                          <span className="interest-check">
                            ✓
                          </span>
                        )}

                        <span>{template}</span>
                      </button>
                    );
                  })}
                </div>

                {requestMessage && (
                  <div
                    className={
                      requestSuccess
                        ? "contact-message success"
                        : "contact-message error"
                    }
                  >
                    {requestMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={sendingRequest}
                >
                  {sendingRequest
                    ? homeContent.contact.sending
                    : homeContent.contact.submitButton}
                </button>
              </form>

              <div className="contact-info">
                <div className="contact-info-row">
                  <div className="contact-info-icon">
                    ☎
                  </div>

                  <div>
                    <span>
                      {homeContent.contact.phoneLabel}
                    </span>

                    <strong>
                      {homeContent.contact.phone}
                    </strong>
                  </div>
                </div>

                <div className="contact-info-row">
                  <div className="contact-info-icon">
                    ✉
                  </div>

                  <div>
                    <span>
                      {homeContent.contact.emailLabel}
                    </span>

                    <strong>
                      {homeContent.contact.email}
                    </strong>
                  </div>
                </div>

                <div className="contact-info-row">
                  <div className="contact-info-icon">
                    📍
                  </div>

                  <div>
                    <span>
                      {homeContent.contact.addressLabel}
                    </span>

                    <strong>
                      {homeContent.contact.address}
                    </strong>
                  </div>
                </div>

                <div className="contact-socials">
                  <button type="button">in</button>
                  <button type="button">f</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;