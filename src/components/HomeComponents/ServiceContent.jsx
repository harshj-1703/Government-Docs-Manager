import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockIcon from "@mui/icons-material/Lock";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const services = [
  {
    title: "Uploading Documents",
    description: "Upload new documents for verification.",
    icon: <CloudUploadIcon />,
  },
  {
    title: "Hybrid Document Verification",
    description:
      "For important documents, verification is based on the majority. For less important documents, random verification is applied.",
    icon: <VerifiedUserIcon />,
  },
  {
    title: "Reducing Corruption",
    description:
      "Implementing strategies to reduce corruption in document management.",
    icon: <PublicIcon />,
  },
  {
    title: "Large Amount of Documents",
    description:
      "Efficiently handling and managing a large volume of documents.",
    icon: <ImageIcon />,
  },
  {
    title: "Data Center Login",
    description: "Secure login for access to the data center.",
    icon: <LockIcon />,
  },
  {
    title: "User Login",
    description: "Secure login for users accessing the system.",
    icon: <PermIdentityIcon />,
  },
  {
    title: "Mobile Verifications",
    description: "Conducting verification processes via mobile devices.",
    icon: <MobileFriendlyIcon />,
  },
  {
    title: "Security",
    description: "Ensuring the security of documents and data.",
    icon: <SecurityIcon />,
  },
  {
    title: "Application Available",
    description: "Mobile application available for convenient access.",
    icon: <AssignmentIndIcon />,
  },
];

function ServiceCard({ title, description, icon }) {
  return (
    <Grid item xs={12} sm={4}>
      <Card className="card-container">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item className="icon-service">
              {icon}
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <div id="main-service-text">{title}</div>
          <div id="second-service-text">{description}</div>
        </CardContent>
      </Card>
    </Grid>
  );
}

function ServiceContent() {
  return (
    <Container className="root-container">
      <Grid container spacing={2} height="100%">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </Grid>
    </Container>
  );
}

export default ServiceContent;
