import React from 'react';
import { BiChevronRightSquare, BiStats } from "react-icons/bi";
import { ImStatsDots, ImStatsBars2 } from "react-icons/im";
import { GiStairsGoal, GiTeamUpgrade } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiTeamLine, RiAccountCircleLine } from "react-icons/ri";
import { FaCalendarCheck } from "react-icons/fa";
import { IoBuild } from "react-icons/io5";

const menulinks = [
    {
      section: 'main',
      links: [
        { label: 'scoreboard', icon: <ImStatsDots />, url: '/welcome' },
        { label: 'wig session', icon: <FaCalendarCheck />, url: '/wig-session' },
        { label: 'wig session summary', icon: <HiOutlineDocumentReport />, url: '/wig-session-summary' },
        { label: 'team scoresheet', icon: <GiTeamUpgrade />, url: '/team-scoresheet' },
      ],
    },
    {
      section: '4dx setup',
      links: [
        { label: 'add wig', icon: <GiStairsGoal />, url: '/setup/add-wig' },
        { label: 'add lead measures', icon: <ImStatsBars2 />, url: '/setup/add-lead-measures' },
        { label: 'scoreboard builder', icon: <IoBuild />, url: '/setup/scoreboard-builder' },
        { label: 'tracking', icon: <BiStats />, url: '/setup/lead-lag-tracker' },
      ],
    },
    {
      section: 'admin',
      links: [
        { label: 'member management', icon: <RiTeamLine />, url: '/admin/member-management' },
      ],
    },
    {
      section: 'personal',
      links: [
        { label: 'manage account', icon: <RiAccountCircleLine />, url: '/account' },
      ],
    },
  ];
  
  export default menulinks;