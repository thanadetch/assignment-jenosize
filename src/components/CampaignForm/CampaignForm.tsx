"use client";

import {Box, TextField, Typography, Button, Paper} from "@mui/material";
import {useState} from "react";
import {Editor} from "./Editor";

export const CampaignForm = () => {
    const [campaignName, setCampaignName] = useState("");
    const [subjectLine, setSubjectLine] = useState("");
    const [emailContent, setEmailContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Campaign Name:", campaignName);
        console.log("Subject Line:", subjectLine);
        console.log("Email Content:", emailContent);
        console.log("Form submitted!");

        // Here you would typically send the data to your backend API
        // Example: await createCampaign({ campaignName, subjectLine, emailContent });
    };

    const handleClear = () => {
        setCampaignName("");
        setSubjectLine("");
        setEmailContent("");
    };

    return (
        <Paper elevation={2} sx={{p: 4, maxWidth: 800, mx: "auto", mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create New Email Campaign
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                {/* Campaign Name Input */}
                <TextField
                    fullWidth
                    label="Campaign Name"
                    variant="outlined"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    required
                    sx={{mb: 3}}
                    placeholder="Enter campaign name"
                />

                {/* Subject Line Input */}
                <TextField
                    fullWidth
                    label="Subject Line"
                    variant="outlined"
                    value={subjectLine}
                    onChange={(e) => setSubjectLine(e.target.value)}
                    required
                    sx={{mb: 3}}
                    placeholder="Enter email subject line"
                />

                {/* Email Content Editor */}
                <Box sx={{mb: 3}}>
                    <Typography variant="h6" component="label" gutterBottom>
                        Email Content *
                    </Typography>
                    <Box sx={{border: 1, borderColor: 'divider', borderRadius: 1}}>
                        <Editor
                            content={emailContent}
                            onChange={setEmailContent}
                            placeholder="Add your email content here..."
                        />
                    </Box>
                </Box>

                {/* Submit Button */}
                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2}}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={!campaignName || !subjectLine}
                    >
                        Create Campaign
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};