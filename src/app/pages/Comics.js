import React, {useEffect, useState, useRef} from "react";
import "../styles/components/Footer.scss"
import {Button, ButtonGroup, Col, Container, Form, InputGroup, Row, ToggleButton} from "react-bootstrap";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import {Grid, Search, SortDownAlt, SortUp, ViewList, X} from "react-bootstrap-icons";

export default function Comics() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [content, setContent] = useState({});
    const [viewMode, setViewMode] = useState("grid");
    const [viewLimit, setViewLimit] = useState("20");
    const [viewPage, setViewPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortField, setSortField] = useState("title");
    const [search, setSearch] = useState();
    const [inputText, setInputText] = useState();

    const searchInput = useRef(null);

    const viewModes = [
        {name: "Grid", value: "grid"},
        {name: "List", value: "list"},
    ];

    const sortOrders = [
        {name: "Ascending", value: "asc"},
        {name: "Descending", value: "dsc"},
    ];

    function getParamString(params) {
        let esc = encodeURIComponent;
        let str = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
        return "?" + str;
    }

    function getMarvelComics() {
        setLoading(true);
        let url = "https://gateway.marvel.com:443/v1/public";
        let apiKey = "acd613f311782853c2787177a69d943c";

        let limit = parseInt(viewLimit);

        let params = {
            apikey: apiKey,
            format: "comic",
            noVariants: true,
            limit: limit,
            offset: viewPage && limit ? (viewPage - 1) * limit : 0,
            orderBy: (sortOrder === "dsc" ? "-" : "") + sortField
        };

        if (search) {
            params = {...params, titleStartsWith: search};
        }

        console.log(url + "/comics" + getParamString(params)); //TODO: remove this
        axios.get(url + "/comics" + getParamString(params))
        .then((response) => {
            if (response.data.code === 200) {
                setLoading(false);
                setContent(response.data.data);
                console.log(response.data.data); //TODO: remove this
            }
        }).catch((e) => {
            setLoading(false);
            setError({message: e.message});
            console.error(e)
        });
    }

    // useEffect(() => {
    //     getMarvelComics();
    // }, []);

    useEffect(() => {
        getMarvelComics();
    }, [
        viewLimit,
        viewPage,
        sortOrder,
        sortField,
        search
    ]);

    useEffect(() => {
        const timeOutId = setTimeout(() => setSearch(inputText), 500);
        return () => clearTimeout(timeOutId);
    }, [inputText]);


    return (
        <Container>
            <Row>
                <Col>
                    <h2>Comics</h2>
                </Col>
            </Row>
            {loading && <Loading/>}
            {error && <Error error={error} callback={() => setError(null)}/>}
            <Row>
                <Col>
                    <Form>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><Search/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                ref={searchInput}
                                placeholder="Search Comics"
                                value={inputText}
                                onChange={(e) => {
                                    setInputText(e.target.value)
                                }}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => {
                                        // setSearch(null);
                                        setInputText("");
                                    }}
                                >
                                    <X/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
                <Col>
                    <Form inline>
                        <Form.Label>Sort</Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            onChange={(e) => {
                                setSortField(e.currentTarget.value);
                            }}
                            defaultValue="title"
                        >
                            <option value="title">Title</option>
                            <option value="issueNumber">Issue Number</option>
                            <option value="onsaleDate">On Sale Date</option>
                        </Form.Control>
                        <ButtonGroup toggle>
                            <ToggleButton
                                type="radio"
                                variant="outline-secondary"
                                name="viewOption"
                                value={sortOrders[0].value}
                                checked={sortOrders[0].value === sortOrder}
                                onChange={(e) => {
                                    setSortOrder(e.currentTarget.value);
                                }}
                            >
                                <SortDownAlt/>
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                variant="outline-secondary"
                                name="viewOption"
                                value={sortOrders[1].value}
                                checked={sortOrders[1].value === sortOrder}
                                onChange={(e) => {
                                    setSortOrder(e.currentTarget.value);
                                }}
                            >
                                <SortUp/>
                            </ToggleButton>
                        </ButtonGroup>
                    </Form>
                </Col>
                <Col>
                    <Form inline>
                        <Form.Label>View</Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            onChange={(e) => {
                                setViewLimit(e.currentTarget.value);
                            }}
                        >
                            <option selected>20</option>
                            <option>40</option>
                            <option>60</option>
                            <option>80</option>
                            <option>100</option>
                        </Form.Control>
                        <ButtonGroup toggle>
                            <ToggleButton
                                type="radio"
                                variant="outline-secondary"
                                name="viewOption"
                                value={viewModes[0].value}
                                checked={viewModes[0].value === viewMode}
                                onChange={(e) => {
                                    setViewMode(e.currentTarget.value);
                                }}
                            >
                                <Grid/>
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                variant="outline-secondary"
                                name="viewOption"
                                value={viewModes[1].value}
                                checked={viewModes[1].value === viewMode}
                                onChange={(e) => {
                                    setViewMode(e.currentTarget.value);
                                }}
                            >
                                <ViewList/>
                            </ToggleButton>
                        </ButtonGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Showing: {content?.offset || 0} - {(content?.offset || 0) + (content?.count || 0)} of {content?.total || 0}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul className={viewMode == "grid" ? "grid-view" : "list-view"}>
                        {content?.results ? content.results.map((comicItem, i) =>
                            <li key={i}>
                                <img src={comicItem.thumbnail.path + "." + comicItem.thumbnail.extension}
                                     height="150px"/>
                                <p>Title: {comicItem.title}</p>
                                <p>Description: {comicItem.description}</p>
                                <p>Page count: {comicItem.pageCount}</p>
                            </li>
                        ) : "No Comics"}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}