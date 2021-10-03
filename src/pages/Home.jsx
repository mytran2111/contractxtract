import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Home ({onContractUpload}) {

    const [step, setStep] = React.useState(0)

    const handleNext = () => {setStep(step + 1)}
    const handleBack = () => {setStep(step - 1)}

    const askGpt3 = (text) => {
        handleNext();
        const prompts = {
            agDate: "Agreement Date:",
            efDate: "Effective Date:",
            agType: "Agreement Type:",
            fParty: "First party:",
            sParty: "Second party:",
            sm: "Summary:"
        }
        const callGpt3 = (prompt) => {
            return new Promise(async (resolve, reject) => {
                const resp = await fetch("https://api.openai.com/v1/engines/" + "davinci" + "/completions", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + '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'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: prompt,
                        stop: "\n",
                        temperature: 0.7,
                        max_tokens: 128
                    })
                });
                const json = await resp.json();
                resolve(json?.choices?.[0]?.text);
            })
        }
        const buildPrompt = (text, prompt) => text + '\n---------\nInfo:\n' + prompt
        const answers = Promise.all(Object.values(prompts).map(el => buildPrompt(text, el)).map(el => callGpt3(el)));
        answers.then((answers) => {
            onContractUpload(text, answers)
        })
    }

    return <div style={{paddingTop: "16px"}}>
        <Paper variant="outlined" style={{maxWidth: "800px", margin: "0 auto", padding: "16px"}}>
        <Stepper activeStep={step} orientation="vertical">
          <Step key={"0"}>
            <StepLabel>
              About Contract Explorer
            </StepLabel>
            <StepContent>
              <Typography>Contract Explorer uses natural language processing to analyze your contract,
                   and give you basic information about its content, and if there are any important issues you need to look for.</Typography>
                <br/>
              <Typography><strong>Note</strong>: this is not legal advice. If you have any issues regarding a contract, please contact a lawyer.</Typography>
              <br/>
              <Box sx={{ mb: 2 }}>
                <div style={{display: "flex", alignItems: "baseline"}}>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                  <Typography>By continuing, you acknowledge that this is not legal advice.</Typography>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step key={"1"}>
            <StepLabel>
              Upload your contract
            </StepLabel>
            <StepContent>
              
              <Box sx={{ mb: 2 }}>
                <div>
                    <Typography>Click the button below to upload your contract.</Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                        var element = document.createElement('input');
                        element.setAttribute('type', 'file');
                        element.onchange = (ev) => {
                            const file = element.files[0];
                            file.text().then((text) => {
                                //onContractUpload(text);
                                askGpt3(text);
                            })

                        }

                        element.style.display = 'none';
                        document.body.appendChild(element);

                        element.click();

                        document.body.removeChild(element);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Upload
                  </Button>
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
            </Step>
            <Step key={"2"}>
            <StepLabel>
              Process with AI
            </StepLabel>
            <StepContent>
                <Typography>GPT-3 is processing the contract. Please wait...</Typography>
            </StepContent>
          </Step>
      </Stepper>
        </Paper>
    </div>
}