import React from "react";
import styled from "styled-components";
import { useMutation,useLazyQuery } from "@apollo/client";
import { Gif } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";

import Layout  from "../../../components/Layout";
import { Button, H2, Main } from "../../../components/styled";
import { useAuth } from "../../../store/auth";
import { ADMIN_URL_EXISTS } from "../../../graphql";
import VerifyEmailBanner from "../../../components/VerifyEmailBanner";
import { UPDATE_ORGANIZATION } from "../../../graphql";
import Footer from "../../../components/Footer";
import Confetti from 'react-dom-confetti';
const gif_ids = {
  launch: [
    "tXLpxypfSXvUc",
    "cEYFeE4wJ6jdDVBiiIM",
    "NRWFU8lq7hCXS",
    "kjjRGpezebjaw",
    "26DMXCypYxHVNydMc",
    "3oEhn501TH1S2NZATS",
    "dVnzGW7UehcEpwLxBm",
  ],
  popcorn: [
    "hVTouq08miyVo1a21m",
    "NipFetnQOuKhW",
    "tyqcJoNjNv0Fq",
    "11vsrRFqhjOcKI",
    "nWg4h2IK6jYRO",
    "uWzS6ZLs0AaVOJlgRd",
    "Bzebpz5rnyBb2",
  ],
  loading: [
    "l3nWhI38IWDofyDrW",
    "RgzryV9nRCMHPVVXPV",
    "3y0oCOkdKKRi0",
    "RHEqKwRZDwFKE",
    "wnYB3vx9t6PXiq1ubB",
    "3ohs7TrCSp7c8ZrxBe",
    "NGOoVtuqkfl0A",
  ],
  cooking: [
    "CNocEFcF9IBegtgW3q",
    "N23cG6apipMmQ",
    "3oEjHC7al4GfnudR7y",
    "xTk9ZAbN1rHWoMiANy",
    "5hrj42zCA1RoA",
    "H1NDopejHQjB5CQ8Yf",
    "rkgX9MTBXJa1O",
  ],
  excitement: [
    "q4sdF9tchap6E",
    "5GoVLqeAOo6PK",
    "nSkIv4g54tFni",
    "l3vR1AaADYcE7C8vu",
    "nnFwGHgE4Mk5W",
    "3o85xozRUKxoFSxODe",
    "WUq1cg9K7uzHa",
  ],
  congrats: [
    "g9582DNuQppxC",
    "5nmNO4kFHvgqF1wnPg",
    "l2Sqir5ZxfoS27EvS",
    "l2YWCPLrCIaNc9QT6",
    "mPIA4KZVXv0ty",
    "bKBM7H63PIykM",
    "l0MYCn3DDRBBqk6nS",
  ],
};

export default function FinishSetup() {
  const { user } = useAuth();

  
  return (
    <div hidesteps={user?.organization?.onboardStatus === "FINISH_SETUP"}>
      <Layout style={{marginBottom:"20rem"}}>
      <Main >
        {!user?.keycloak?.email_verified && <VerifyEmailBanner />}
        {user?.organization?.onboardStatus === "SETUP_DOMAIN" ? (
          <Installation />
        ) : (
          <GifCycle />
        )}
      </Main>
      </Layout><Footer/>
  </div>
  );
}
const config = {
  angle: "90",
  spread: "230",
  startVelocity: "32",
  elementCount: "200",
  dragFriction: 0.12,
  duration: "2160",
  stagger: 3,
  width: "18px",
  height: "16px",
  perspective: "384px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};
const Installation = () => {
  const { user } = useAuth();
  const [name, setName] = React.useState("");
  const [onProps,setOnProps] = React.useState(false);
  const [error, setError] = React.useState("");
  const [check_url] = useLazyQuery(ADMIN_URL_EXISTS, {
  
    onCompleted: ({url}) => {
      console.log({url})
      if (url.length > 0) {
        setError("This url already exists!");
      } 
      else {
        setError(false);
      }
    },
  });

  const handleUrlExists = (value) =>
    check_url({ variables: { where: {"organization":{"organizationUrl": 
    {"_eq":value}}}
}})

  const [update, { loading }] = useMutation(UPDATE_ORGANIZATION, {
    onError: (error) => {
      console.log(error);
    },
  });

  const submit = () => {
    update({
      variables: {
        id: user.organization?.id,
        _set: {
          instanceRequested: true,
          onboardStatus: "FINISH_SETUP",
          organizationUrl: `${name}.dailykit.org`,
        },
      },
    });
  setOnProps(true)

  };
  return (
    <div className="flex-container" style={{ display: "flex", justifyContent: "center", margin: "2rem 0 2rem" }}>
      <div className="finishSetupSection mt-3 mx-auto text-center" >
        <h2 className="text-2xl" style={{"marginTop":"23px",fontWeight:"bold"}}>Customize your URL</h2>
        <p className="text-center text-gray-500 mb-2" >
          This is where you will access your apps and manage your team.<br/> Make sure
          to bookmark it once you’re inside.
        </p>
        <section className="mb-3 flex flex-col items-center">
          <input
            required
            id="name"
            type="text"
            name="name"
            value={name}
            autoComplete="off"
            placeholder="Enter your subdomain"
            onChange={(e) => {setName(e.target.value.trim()); handleUrlExists(e.target.value.trim()+".dailykit.org")}}
            // onBlur={(e) => }
            className="input-border h-10 border-b-2 border-green-400 focus:border-green-600"
          /><br/>
          <span className="text-left text-green-500">{name}.dailykit.org</span>
          
          <div style={{marginLeft:"10rem"}}><Confetti active={ onProps } config={ config }/></div>
          
        </section>

        <Button
          onClick={submit}
          disabled={!name || loading || !user?.keycloak?.email_verified || error}
        >
          {loading ? "Saving" : "Save"}
        </Button> 
        {error && (
            <Error>{error}</Error>
          )}
      </div>
    </div>
  );
};
const giphy = new GiphyFetch(process.browser && `${window._env_.GIPHY_KEY}`);
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const GifCycle = () => {
  const { user } = useAuth();
  const [gifs, setGifs] = React.useState([]);

  const get = async (id) => await (await giphy.gif(id)).data;

  React.useEffect(() => {
    (async () => {
      // launch
      const launchGifs = await Promise.all(gif_ids.launch.map(get));
      setGifs(launchGifs);
      await sleep(240000);
      // popcorn
      const popcornGifs = await Promise.all(gif_ids.popcorn.map(get));
      setGifs(popcornGifs);
      await sleep(240000);
      // loading
      const loadingGifs = await Promise.all(gif_ids.loading.map(get));
      setGifs(loadingGifs);
      await sleep(240000);
      // cooking
      const cookingGifs = await Promise.all(gif_ids.cooking.map(get));
      setGifs(cookingGifs);
      await sleep(240000);
      // excitement
      const excitementGifs = await Promise.all(gif_ids.excitement.map(get));
      setGifs(excitementGifs);
      await sleep(240000);
      // congrats
      const congratsGifs = await Promise.all(gif_ids.congrats.map(get));
      setGifs(congratsGifs);
    })();
  }, []);
  return (
    <div className="relative">
      {user.organization?.instanceStatus === "SETUP_COMPLETED" ? (
        <header className="text-left p-3 absolute z-10 inset-0 h-full">
          <h1 className="mb-3 text-2xl font-medium text-white ">
            You're DailyOS is ready to use.
          </h1>
          {user.organization.url && (
            <a
              target="__blank"
              rel="noopener noreferrer"
              href={`https://${user.organization.url}/desktop`}
              className="bg-green-500 text-white rounded inline-flex items-center px-3 h-10"
            >
              Go to DailyOS
            </a>
          )}
        </header>
      ) : (
        <header className="text-left p-3 absolute z-10 inset-0 h-full">
          <h2 className="text-2xl text-center" style={{fontWeight:"bold"}}>
            Setting up your instance!
          </h2>
          <p className="mt-1 text-center leading-5">
            This could take a while. In the meantime, enjoy this GIF sequence
            we've curated for you.
          </p>
        </header>
      )}
      <section style={{marginLeft:"25%",maxWidth:"50vw"}}>{gifs.length > 0 && <RenderGif gifs={gifs} />}</section>
    </div>
  );
};

const RenderGif = ({ gifs }) => {
  const { user } = useAuth();
  const [gif, setGif] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      setGif(gifs[0]);
      await sleep(34286);
      setGif(gifs[1]);
      await sleep(34286);
      setGif(gifs[2]);
      await sleep(34286);
      setGif(gifs[3]);
      await sleep(34286);
      setGif(gifs[4]);
      await sleep(34286);
      setGif(gifs[5]);
      await sleep(34286);
      setGif(gifs[6]);
    })();
  }, [gifs]);
  return (
    gif && (
      <Gif
        gif={gif} height="500px"
      />
    )
  );
};

const Error=styled.span`
justify-self: start;
display: block;
--tw-text-opacity: 1;
color: rgba(239, 68, 68, var(--tw-text-opacity));
margin-top: 0.5rem;
font-weight:bold;
font-family:nunito;
`
