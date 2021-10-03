import { Card, Divider, Typography } from "@mui/material";

export default function Detailed ({text, answers}) {
    return <div style={{maxWidth: "800px", margin: "0 auto", paddingTop: "16px", display: "flex"}}>
        <pre style={{flexGrow: 1}}>
            {text}
        </pre>
        <Card style={{minWidth: "240px", padding: "8px", height: "fit-content"}} variant="outlined">
            <Typography><strong>Agreement date</strong>:{answers[0]}</Typography>
            <Typography><strong>Effective date</strong>:{answers[1]}</Typography>
            <Typography><strong>Agreement type</strong>:{answers[2]}</Typography>
            <Typography><strong>First party</strong>:{answers[3]}</Typography>
            <Typography><strong>Second party</strong>:{answers[4]}</Typography>
            <Divider></Divider>
            <Typography><strong>Summary</strong>:<br/>{answers[5]}</Typography>
        </Card>
    </div>
}