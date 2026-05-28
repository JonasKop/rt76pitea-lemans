import {
  Beer,
  CalendarDays,
  Car,
  ChevronRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EventMap } from "./components/EventMap";
import { MemoryGallery } from "./components/MemoryGallery";

const registrationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSci596qJ1BtjNeecqEjl-AekyKJiq3F-Q1NWBm0ccW-Ip9MAQ/viewform";
const mapUrl =
  "https://www.google.com/maps/place/Pite+Havsbad/@65.2370999,21.4952386,6412m/data=!3m1!1e3!4m19!1m8!3m7!1s0x467f1996f6531a9f:0xa03450954ed9200!2s941+43+Pite+havsbad!3b1!8m2!3d65.2371063!4d21.5261381!16s%2Fg%2F1212xktk!3m9!1s0x467f1997dc3dbe35:0xe09704df833f638!5m2!4m1!1i2!8m2!3d65.2333521!4d21.5339147!15sCgxwaXRlIGhhdnNiYWRaDiIMcGl0ZSBoYXZzYmFkkgEFaG90ZWzgAQA!16s%2Fg%2F1q5bqdn3w?entry=ttu&g_ep=EgoyMDI2MDUyNS4wIKXMDSoASAFQAw%3D%3D";
const facebookUrl = "https://www.facebook.com/groups/469674375735453";

const highlights = [
  { icon: CalendarDays, label: "21-22 augusti 2026", value: "Fredag-lördag" },
  { icon: MapPin, label: "Pite Havsbad", value: "Piteå" },
  { icon: Trophy, label: "RT76 Sverige klassikerstatus", value: "Tradition" },
];

const schedule = [
  {
    day: "Fredag",
    time: "18:00",
    title: "Pre party",
    text: "Inkörning, handslag och den där sortens uppladdning som bara blir rimlig i Piteå.",
  },
  {
    day: "Lördag",
    time: "Förmiddag",
    title: "Brunch och samling",
    text: "Dagen börjar med den berömda brunchen och ett officiellt RT-möte ute på havsbadet.",
  },
  {
    day: "Lördag",
    time: "Race day",
    title: "Gokart, lunch, middag och fest",
    text: "Gemensam buss till gokartbanan på Pite Havsbad. Tävling, mat, bastu, dusch och partytält.",
  },
  {
    day: "Lördag",
    time: "Kväll",
    title: "Stans uteliv",
    text: "Senare på kvällen går gemensam buss in mot Piteås nattliv för finalvarvet.",
  },
];

const practical = [
  "Ta med handduk. Dusch, bastu och omklädnad finns efter tävlingen.",
  "Vi är utomhus i partytält. Klä dig efter väder, inte efter självbild.",
  "Boende väljs i anmälan: lös själv eller ange behov av homehosting.",
  "Specialkost och annat viktigt lämnas direkt i formuläret.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090806] text-[#f8efd8]">
      <header className="sticky top-0 z-50 border-b border-[#d8ad62]/16 bg-[#090806]/82 px-4 py-4 shadow-[0_12px_44px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Till toppen"
          >
            <span className="relative h-9 w-12 overflow-hidden rounded-sm border border-[#d8ad62]/30 bg-[#fff6df] p-1 shadow-lg shadow-black/20 sm:h-11 sm:w-14">
              <Image
                src="/images/official/rt76-pitea.webp"
                alt=""
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#f8efd8]/78 md:flex">
            <a className="transition hover:text-[#d8ad62]" href="#schema">
              Schema
            </a>
            <a className="transition hover:text-[#d8ad62]" href="#praktiskt">
              Praktiskt
            </a>
            <a className="transition hover:text-[#d8ad62]" href="#lotteri">
              Lotteri
            </a>
            <a className="transition hover:text-[#d8ad62]" href="#plats">
              Plats
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 border-r border-[#d8ad62]/20 pr-3 lg:flex">
              <Image
                src="/images/official/round-table-sweden.webp"
                alt="Round Table Sweden"
                width={34}
                height={34}
                className="h-8 w-8 object-contain"
              />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#f8efd8]/62">
                Sverige
              </span>
            </div>
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-sm border border-[#d8ad62]/50 bg-[#d8ad62] px-2.5 text-[10px] font-black uppercase tracking-[0.06em] text-[#120b05] transition hover:bg-[#f1c979] sm:h-11 sm:gap-2 sm:px-4 sm:text-sm sm:tracking-[0.12em]"
            >
              <span className="sm:hidden">Anmäl</span>
              <span className="hidden sm:inline">Anmäl dig</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <section className="relative min-h-[92svh] border-b border-[#d8ad62]/20">
        <Image
          src="/images/lemans-pub-hero.webp"
          alt="Mörk pubmiljö med ölglas, racingdetaljer och guldtoner"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,8,6,0.96)_0%,rgba(9,8,6,0.72)_43%,rgba(9,8,6,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_26%,rgba(216,173,98,0.16),transparent_31%),linear-gradient(180deg,rgba(9,8,6,0.05),rgba(9,8,6,0.88))]" />

        <div className="relative mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <div
            id="top"
            className="grid flex-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)]"
          >
            <div className="w-full max-w-3xl">
              <p className="mb-5 inline-flex max-w-full items-center gap-2 border-y border-[#d8ad62]/35 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d8ad62] sm:text-xs sm:tracking-[0.28em]">
                <ShieldCheck size={15} aria-hidden="true" />
                Round Table 76 Piteå presenterar
              </p>
              <h1 className="font-serif text-6xl font-bold leading-[0.88] text-[#fff6df] sm:text-7xl md:text-8xl lg:text-9xl">
                Lemans
                <span className="gold-text block">24 Ölars</span>
              </h1>
              <p className="mt-7 max-w-[21rem] text-lg leading-8 text-[#f8efd8]/84 sm:max-w-2xl sm:text-xl">
                Två dagar i Piteå där gokartnerv, bastuånga och gyllene dryck
                förenas till en RTS-klassiker.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-sm bg-[#d8ad62] px-6 text-sm font-black uppercase tracking-[0.14em] text-[#120b05] transition hover:bg-[#f1c979] sm:w-auto"
                >
                  Säkra din plats
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
                <a
                  href="#schema"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-sm border border-[#d8ad62]/38 px-6 text-sm font-bold uppercase tracking-[0.14em] text-[#f8efd8] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10 sm:w-auto"
                >
                  Se upplägget
                </a>
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-sm lg:block">
              <div className="absolute inset-8 rounded-full bg-[#d8ad62]/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-md border border-[#d8ad62]/28 bg-[#050403]/72 p-4 shadow-2xl shadow-black/50">
                <Image
                  src="/images/official/lemans-badge.webp"
                  alt="Lemans 24-ölars RT76 Piteå"
                  width={1324}
                  height={1182}
                  priority
                  className="h-auto w-full rounded-sm object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 pb-7 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, label, value }) => (
              <div key={label} className="pub-panel rounded-md p-4">
                <Icon className="mb-3 text-[#d8ad62]" size={22} />
                <p className="text-base font-bold text-[#fff6df]">{label}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.1em] text-[#d8ad62]/78 sm:tracking-[0.16em]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="lotteri"
        className="anchor-section bg-[#11170f] px-5 py-14 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8ad62]">
              Klassikerstatus
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#fff6df] sm:text-5xl">
              En RTS-klassiker med Piteå som hemmabana.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <p className="text-lg leading-8 text-[#f8efd8]/80">
              Lemans 24 Ölars har vuxit till en självklar samlingspunkt för
              bröder och gäster från när och fjärran. En helg där tävling,
              gemenskap och norrländsk gästfrihet får ta plats på riktigt.
            </p>
            <div className="flex items-center gap-3 rounded-md border border-[#d8ad62]/24 bg-[#090806]/44 p-3">
              <Image
                src="/images/official/rt76-pitea.webp"
                alt="RT76 Piteå"
                width={116}
                height={89}
                className="h-16 w-24 rounded-sm bg-[#fff6df] object-contain p-1"
              />
              <Image
                src="/images/official/round-table-sweden.webp"
                alt="Round Table Sweden"
                width={76}
                height={74}
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="schema" className="anchor-section px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8ad62]">
                Schema
              </p>
              <h2 className="mt-3 font-serif text-4xl font-bold text-[#fff6df] sm:text-5xl">
                21-22 augusti 2026
              </h2>
            </div>
            <p className="max-w-xl text-[#f8efd8]/70">
              Mer detaljerat schema kommer närmare start. Grundformen är spikad
              och anmälan är öppen.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {schedule.map((item) => (
              <article
                key={`${item.day}-${item.time}`}
                className="pub-panel rounded-md p-5"
              >
                <div className="mb-7 flex items-center justify-between gap-3">
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-[#d8ad62]">
                    {item.day}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-[#f8efd8]/62">
                    <Clock3 size={15} aria-hidden="true" />
                    {item.time}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#fff6df]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-[#f8efd8]/72">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="praktiskt"
        className="anchor-section bg-[#24130d] px-5 py-16 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8ad62]">
              Praktiskt
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#fff6df] sm:text-5xl">
              Pris, packning och pubetikett.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="pub-panel rounded-md p-5">
              <Beer className="mb-4 text-[#d8ad62]" size={24} />
              <h3 className="font-serif text-2xl font-bold text-[#fff6df]">
                Anmälan och betalning
              </h3>
              <dl className="mt-5 space-y-3 text-[#f8efd8]/78">
                <div className="flex items-center justify-between gap-5 border-b border-[#d8ad62]/16 pb-3">
                  <dt>Fredag och lördag</dt>
                  <dd className="font-bold text-[#d8ad62]">1990 kr</dd>
                </div>
                <div className="flex items-center justify-between gap-5 border-b border-[#d8ad62]/16 pb-3">
                  <dt>Bara lördag</dt>
                  <dd className="font-bold text-[#d8ad62]">1495 kr</dd>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <dt>Swish</dt>
                  <dd className="font-bold text-[#d8ad62]">123-233 38 96</dd>
                </div>
              </dl>
            </div>

            <div className="pub-panel rounded-md p-5">
              <UsersRound className="mb-4 text-[#d8ad62]" size={24} />
              <h3 className="font-serif text-2xl font-bold text-[#fff6df]">
                Bra att veta
              </h3>
              <ul className="mt-5 space-y-3 text-[#f8efd8]/78">
                {practical.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8ad62]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#11170f] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8ad62]">
              Lotteri
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#fff6df] sm:text-5xl">
              Maxat lotteri på plats.
            </h2>
          </div>
          <div className="pub-panel rounded-md p-6 sm:p-7">
            <Sparkles className="mb-4 text-[#d8ad62]" size={26} />
            <p className="max-w-3xl text-lg leading-8 text-[#f8efd8]/78">
              Under helgen kör vi ett ordentligt lotteri med priser värdiga en
              RTS-klassiker. Mer detaljer kommer, men räkna med att det blir
              värt att hålla sig nära dragningen.
            </p>
          </div>
        </div>
      </section>

      <section id="plats" className="anchor-section px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
          <div className="pub-panel rounded-md p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8ad62]">
              Plats
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#fff6df] sm:text-5xl">
              Pite Havsbad
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#f8efd8]/78">
              Basläger, gokartbana och återhämtning samlas vid havet. Öppna
              Google Maps när du ska navigera, och ta en snabb titt på kartan
              här för att placera dig mentalt vid kusten.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#d8ad62] px-5 text-sm font-black uppercase tracking-[0.14em] text-[#120b05] transition hover:bg-[#f1c979]"
              >
                Öppna Google Maps
                <MapPin size={17} aria-hidden="true" />
              </a>
              <a
                href={`mailto:lemans24olars@gmail.com`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-[#d8ad62]/38 px-5 text-sm font-bold uppercase tracking-[0.14em] text-[#f8efd8] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10"
              >
                Maila arrangör
                <Mail size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-[#d8ad62]/24 bg-[#13221a] shadow-2xl shadow-black/35">
            <div className="flex items-center justify-between border-b border-[#d8ad62]/20 bg-[#11170f] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#d8ad62]">
              <span>Piteå</span>
              <Car size={20} aria-hidden="true" />
            </div>
            <EventMap />
            <div className="border-t border-[#d8ad62]/20 bg-[#0f0d0a] px-4 py-3">
              <p className="font-serif text-2xl font-bold text-[#fff6df]">
                Havsbadet
              </p>
              <p className="mt-1 text-sm text-[#f8efd8]/68">
                Startpunkt för brödraskap, kvalvarv och rimlig återhämtning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f0d0a] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8ad62]">
                Minnesbanken
              </p>
              <h2 className="mt-3 font-serif text-4xl font-bold text-[#fff6df] sm:text-5xl">
                Bilder från tidigare varv.
              </h2>
            </div>
          </div>

          <MemoryGallery />
        </div>
      </section>

      <section className="bg-[#10100d] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8ad62]">
              Inbjudan
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#fff6df] sm:text-5xl">
              En helg för bröder, gäster och gokartben.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#f8efd8]/76">
              Fredag kväll öppnar vi dörrarna. Lördag samlar vi gänget vid havet
              för brunch, RT-möte, buss till banan, racing, mat, bastu och
              vidare färd mot stan. Det är enkelt, socialt och exakt så seriöst
              som en klassiker ska vara.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-md border border-[#d8ad62]/28 bg-[#17120d] p-5 shadow-2xl shadow-black/35 sm:p-7">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,rgba(216,173,98,.22)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="relative grid gap-4 md:grid-cols-3">
              <div className="border-b border-[#d8ad62]/20 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d8ad62]">
                  Datum
                </p>
                <p className="mt-3 font-serif text-3xl font-bold leading-none text-[#fff6df]">
                  21-22
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-[#f8efd8]/70">
                  augusti 2026
                </p>
              </div>
              <div className="border-b border-[#d8ad62]/20 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d8ad62]">
                  Plats
                </p>
                <p className="mt-3 font-serif text-3xl font-bold leading-none text-[#fff6df]">
                  Pite
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-[#f8efd8]/70">
                  Havsbad
                </p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d8ad62]">
                  Disciplin
                </p>
                <p className="mt-3 font-serif text-3xl font-bold leading-none text-[#fff6df]">
                  24 Ölars
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-[#f8efd8]/70">
                  endurance
                </p>
              </div>
            </div>

            <div className="relative mt-7 border-t border-[#d8ad62]/20 pt-6">
              <p className="font-serif text-3xl font-bold text-[#fff6df] sm:text-4xl">
                Brunch. Buss. Gokart. Bastu. Partytält. Stadens uteliv.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#f8efd8]/76">
                Fredag startar med pre party. Lördag kör vi den berömda
                brunchen, officiellt RT-möte, gemensam buss till gokartbanan,
                tävling, lunch, middag och en kväll som fortsätter in mot stan.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#d8ad62] px-5 text-sm font-black uppercase tracking-[0.14em] text-[#120b05] transition hover:bg-[#f1c979]"
                >
                  Till formuläret
                  <ExternalLink size={17} aria-hidden="true" />
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-[#d8ad62]/38 px-5 text-sm font-bold uppercase tracking-[0.14em] text-[#f8efd8] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10"
                >
                  Facebookgruppen
                  <ExternalLink size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Image
            src="/images/official/lemans-badge.webp"
            alt="Lemans 24-ölars RT76 Piteå"
            width={210}
            height={188}
            className="mb-7 h-auto w-40 rounded-md border border-[#d8ad62]/28 bg-black/40 p-2 shadow-2xl shadow-black/35 sm:w-52"
          />
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8ad62]">
            Välkommen till Piteå
          </p>
          <h2 className="mt-3 font-serif text-5xl font-bold text-[#fff6df] sm:text-6xl">
            Winners are not born. They finish.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#f8efd8]/76">
            Kom till Piteå med gott humör, tävlingsnerv och respekt för
            traditionen. Resten tar vi på plats.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-[#d8ad62] px-6 text-sm font-black uppercase tracking-[0.14em] text-[#120b05] transition hover:bg-[#f1c979]"
            >
              Till anmälan
              <ExternalLink size={17} aria-hidden="true" />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-sm border border-[#d8ad62]/38 px-6 text-sm font-bold uppercase tracking-[0.14em] text-[#f8efd8] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10"
            >
              Facebookgruppen
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-[#d8ad62]/20 pt-8 sm:flex-row">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#f8efd8]/58">
              Arrangeras av
            </span>
            <div className="flex items-center gap-4">
              <Image
                src="/images/official/rt76-pitea.webp"
                alt="RT76 Piteå"
                width={132}
                height={102}
                className="h-14 w-20 rounded-sm bg-[#fff6df] object-contain p-1"
              />
              <Image
                src="/images/official/round-table-sweden.webp"
                alt="Round Table Sweden"
                width={68}
                height={66}
                className="h-14 w-14 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
