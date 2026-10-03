/**
 * Photo registry. Every image on the site is referenced by key from here.
 *
 * These are SAMPLE photos from Pexels (free licence; credits in README.md). To use your
 * own, replace the file in /public/images with one of the same name — dimensions and blur
 * placeholders update automatically — then update the alt text (and `focus`) below.
 */
import type { StaticImageData } from "next/image";

import brandActivation from "@/public/images/brand-activation.jpg";
import celebration from "@/public/images/celebration.jpg";
import cinemaCamera from "@/public/images/cinema-camera.jpg";
import clapperboard from "@/public/images/clapperboard.jpg";
import concertStage from "@/public/images/concert-stage.jpg";
import contentCreation from "@/public/images/content-creation.jpg";
import corporateKeynote from "@/public/images/corporate-keynote.jpg";
import creativeTeam from "@/public/images/creative-team.jpg";
import destinationWedding from "@/public/images/destination-wedding.jpg";
import editingSuite from "@/public/images/editing-suite.jpg";
import eventDecor from "@/public/images/event-decor.jpg";
import filmSet from "@/public/images/film-set.jpg";
import founderPortrait from "@/public/images/founder-portrait.jpg";
import galaDinner from "@/public/images/gala-dinner.jpg";
import graduation from "@/public/images/graduation.jpg";
import kandy from "@/public/images/kandy.jpg";
import lecture from "@/public/images/lecture.jpg";
import musicVideo from "@/public/images/music-video.jpg";
import podcastMic from "@/public/images/podcast-mic.jpg";
import studioShoot from "@/public/images/studio-shoot.jpg";
import tvStudio from "@/public/images/tv-studio.jpg";
import weddingCouple from "@/public/images/wedding-couple.jpg";
import weddingReception from "@/public/images/wedding-reception.jpg";
import weddingTraditional from "@/public/images/wedding-traditional.jpg";

export type ImageAsset = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position for crops, e.g. keep a face in frame. Defaults to centre. */
  focus?: string;
};

export const images = {
  "brand-activation": { src: brandActivation, alt: "Visitors inside an immersive installation of glowing LED screens" },
  celebration: { src: celebration, alt: "Couple dancing under fairy lights, ringed by guests holding sparklers" },
  "cinema-camera": { src: cinemaCamera, alt: "Rigged cinema camera with a cine lens, cage and top handle" },
  clapperboard: { src: clapperboard, alt: "Film slate on a bamboo mat, ready to mark the next take" },
  "concert-stage": { src: concertStage, alt: "Arena stage washed in teal light beams above a crowd" },
  "content-creation": {
    src: contentCreation,
    alt: "Smartphone on a gimbal recording a creator for social media",
    focus: "50% 30%",
  },
  "corporate-keynote": { src: corporateKeynote, alt: "Audience watching a presenter on a lit conference stage" },
  "creative-team": { src: creativeTeam, alt: "Creative team brainstorming with sticky notes on a glass wall" },
  "destination-wedding": {
    src: destinationWedding,
    alt: "Beachfront wedding ceremony with a floral arch and an ocean view",
  },
  "editing-suite": { src: editingSuite, alt: "Editor colour-grading footage at a dual-monitor editing desk" },
  "event-decor": {
    src: eventDecor,
    alt: "Ballroom dressed with a hanging cherry-blossom installation and glowing orbs",
    focus: "50% 35%",
  },
  "film-set": { src: filmSet, alt: "Film crew working with a shoulder-rig camera in a dark studio" },
  // SAMPLE stand-in: replace with Nisangi's own portrait.
  "founder-portrait": { src: founderPortrait, alt: "Portrait of Nisangi Lawanya Rammandala", focus: "50% 22%" },
  "gala-dinner": {
    src: galaDinner,
    alt: "Banquet hall with candlelit tables, floral centrepieces and violet uplighting",
  },
  graduation: { src: graduation, alt: "Graduates throwing their caps into a clear sky" },
  kandy: { src: kandy, alt: "Sunset over Kandy Lake and its scalloped cloud wall, Sri Lanka" },
  lecture: { src: lecture, alt: "Lecturer teaching students in a tiered lecture hall" },
  "music-video": { src: musicVideo, alt: "Singer performing into a microphone under smoky stage light" },
  "podcast-mic": { src: podcastMic, alt: "Broadcast microphone on a boom arm in a recording studio" },
  "studio-shoot": {
    src: studioShoot,
    alt: "Studio portrait under magenta neon light for a brand campaign",
    focus: "50% 24%",
  },
  "tv-studio": { src: tvStudio, alt: "Television studio with pedestal cameras and a green-screen set" },
  "wedding-couple": { src: weddingCouple, alt: "Bride and groom holding hands in a field at sunset" },
  "wedding-reception": { src: weddingReception, alt: "Night wedding reception under fairy lights and festoon bulbs" },
  "wedding-traditional": {
    src: weddingTraditional,
    alt: "Sri Lankan bride in a Kandyan osariya and traditional jewellery",
    focus: "50% 22%",
  },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
