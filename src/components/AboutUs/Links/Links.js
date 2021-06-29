import React from 'react';

import classes from './Links.module.css';

import {
    RiGithubFill,
    RiLinkedinBoxFill,
    RiLinksFill
} from "react-icons/ri";

const Links = ({ sites }) => {
    const icons = {
        github: <RiGithubFill />,
        linkedin: <RiLinkedinBoxFill />,
        web: <RiLinksFill />
    }
    return (
        < >
            {
                sites.map((site, index) => {
                    return <a key={index} className={classes.Links} href={site.url} target='_blank'>{icons[site.site]}</a>
                })
            }
        </>
    )
}

export default Links
