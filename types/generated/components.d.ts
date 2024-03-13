import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutCertificates extends Schema.Component {
  collectionName: 'components_about_certificates';
  info: {
    displayName: 'Certificates';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.String;
    desc: Attribute.Text;
  };
}

export interface AboutExperience extends Schema.Component {
  collectionName: 'components_about_experiences';
  info: {
    displayName: 'Experience';
    description: '';
  };
  attributes: {
    company_name: Attribute.String;
    designation: Attribute.String;
    description: Attribute.RichText;
    from: Attribute.Date;
    to: Attribute.Date;
    skills: Attribute.String;
  };
}

export interface AboutMe extends Schema.Component {
  collectionName: 'components_about_us';
  info: {
    displayName: 'Me';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    bio: Attribute.String;
    description: Attribute.String;
    dob: Attribute.Date;
    image: Attribute.Media;
  };
}

export interface AboutProjects extends Schema.Component {
  collectionName: 'components_about_projects';
  info: {
    displayName: 'projects';
    description: '';
  };
  attributes: {
    company: Attribute.String;
    name: Attribute.String;
    role: Attribute.String;
    projDesc: Attribute.Text;
  };
}

export interface AboutSkills extends Schema.Component {
  collectionName: 'components_about_skills';
  info: {
    displayName: 'Skills';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    desc: Attribute.Text;
    link: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.certificates': AboutCertificates;
      'about.experience': AboutExperience;
      'about.me': AboutMe;
      'about.projects': AboutProjects;
      'about.skills': AboutSkills;
    }
  }
}
