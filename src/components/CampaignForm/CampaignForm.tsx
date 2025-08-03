"use client";

import {
    Autocomplete,
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {useRef, useState} from "react";
import {Editor} from "./Editor";
import {RichTextEditorRef} from "mui-tiptap";
import {CampaignStatus} from "@/types/campaign";

export const CampaignForm = () => {
    const [campaignName, setCampaignName] = useState("");
    const [subjectLine, setSubjectLine] = useState("");
    const [emailContent, setEmailContent] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [recipients, setRecipients] = useState<string[]>([]);
    const [status, setStatus] = useState<CampaignStatus>(CampaignStatus.Draft);
    const editorRef = useRef<RichTextEditorRef>(null);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        const campaignData = {
            name: campaignName,
            subject: subjectLine,
            content: emailContent,
            fromEmail,
            recipients,
            status,
        };
        console.log("Campaign Data:", campaignData);

        // Here you would typically send the data to your backend API
        // Example: await createCampaign(campaignData);
    };

    const handleClear = () => {
        setCampaignName("");
        setSubjectLine("");
        setEmailContent("");
        editorRef.current?.editor?.commands.setContent("")
        setFromEmail("");
        setRecipients([]);
        setStatus(CampaignStatus.Draft);
    };

    return (
        <Paper elevation={2} sx={{p: 4, maxWidth: 800, mx: "auto", mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create New Email Campaign
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                {/* Status Select */}
                <FormControl fullWidth sx={{mb: 3}}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) =>
                            setStatus(e.target.value as CampaignStatus)
                        }
                    >
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="ready">Ready</MenuItem>
                    </Select>
                </FormControl>

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

                {/* From Email Input */}
                <TextField
                    fullWidth
                    label="From Email"
                    variant="outlined"
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    required
                    sx={{mb: 3}}
                    placeholder="marketing@example.com"
                />

                {/* Recipients Input */}
                <Autocomplete
                    multiple
                    freeSolo
                    options={[]} // You can add suggested emails here if needed
                    value={recipients}
                    onChange={(event, newValue) => {
                        setRecipients(newValue as string[]);
                    }}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={option}
                                {...getTagProps({index})}
                                key={index}
                                size="small"
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Recipients"
                            placeholder="Enter email addresses"
                            helperText="Type email address and press Enter or comma to add"
                        />
                    )}
                    sx={{mb: 3}}
                />

                {/* Email Content Editor */}
                <Box sx={{mb: 3}}>
                    <Typography variant="h6" component="label" gutterBottom>
                        Email Content *
                    </Typography>
                    <Box sx={{border: 1, borderColor: "divider", borderRadius: 1}}>
                        <Editor
                            ref={editorRef}
                            content={emailContent}
                            onChange={setEmailContent}
                            placeholder="Add your email content here..."
                        />
                    </Box>
                </Box>

                {/* Submit Button */}
                <Box sx={{display: "flex", justifyContent: "flex-end", gap: 2}}>
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
                        disabled={
                            !campaignName ||
                            !subjectLine ||
                            !fromEmail ||
                            recipients.length === 0
                        }
                    >
                        Create Campaign
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};
