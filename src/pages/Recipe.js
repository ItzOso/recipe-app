import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");
    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);
    return (
        <DetailWrapper
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="div">
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />
                <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            </div>
            <Info>
                <div className="div2">
                    <Button
                        className={activeTab === "instructions" ? "active" : " "}
                        onClick={() => {
                            setActiveTab("instructions");
                        }}>
                        Instructions
                    </Button>
                    <Button
                        className={activeTab === "ingredients" ? "active" : " "}
                        onClick={() => {
                            setActiveTab("ingredients");
                        }}>
                        Ingredients
                    </Button>
                </div>
                <div className="div3">
                    {activeTab === "instructions" && (
                        <div>
                            <ol>
                                {console.log(details)}
                                {details.analyzedInstructions?.[0].steps.map((step) => (
                                    <li key={step.number}>{step.step}</li>
                                ))}
                            </ol>
                            {/* <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4> */}
                            {/* <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3> */}
                        </div>
                    )}
                    {activeTab === "ingredients" && (
                        <ul>
                            {details.extendedIngredients?.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled(motion.div)`
    margin-top: 5rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        /* background: linear-gradient(35deg, #494949, #313131);
        color: white; */
        border-bottom: 2px solid #313131;
    }
    img {
        max-width: 350px;
        border-radius: 0.5rem;
    }
    h2 {
        margin-bottom: 2rem;
    }

    li {
        font-size: 1.2rem;
        /* line-height: 2.5rem; */
        margin: 2rem 0;
    }
    ul {
        margin-top: 2rem;
    }

    p {
        line-height: 2rem;
        margin: 2rem 0;
        max-width: 350px;
    }

    .div {
        max-width: 350px;
    }

    @media (max-width: 768px) {
        flex-direction: column;

        .div {
            margin: 0 auto;
            max-width: 100%;
            text-align: center;
        }

        p {
            max-width: 90%;
            margin: 0 auto;
            padding: 2rem 0;
            border-bottom: 2px solid black;
        }
        img {
            max-width: 100%;
        }

    }
`;

const Button = styled.button`
    padding: 1rem 0.5rem;
    color: #313131;
    background: white;
    border: none;
    margin-right: 2rem;
    font-weight: 600;
    cursor: pointer;
`;

const Info = styled.div`
    margin-left: 5rem;

    @media (max-width: 768px) {
        margin: 0;
        .div2 {
            text-align: center;
        }

        .div3 {
            margin: 0 5%;
        }
        margin-top: 1rem;
    }
`;

export default Recipe;
