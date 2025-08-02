import {Box, Container} from "@mui/material";
import {CampaignForm} from "@/components/CampaignForm/CampaignForm";

export default function Home() {
    return (
        <Container disableGutters={true}>
            <Box sx={{my: 2}}>
                <CampaignForm />
            </Box>
        </Container>
    );
}
