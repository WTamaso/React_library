import React, {useEffect, useRef, useState} from "react";
import "../styles/components/Footer.scss"
import {Button, ButtonGroup, Col, Container, Form, InputGroup, Pagination, Row, ToggleButton} from "react-bootstrap";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import {Bookmarks, BookmarkX, Envelope, Grid, Search, SortDownAlt, SortUp, ViewList, X} from "react-bootstrap-icons";
import Details from "../components/Details";

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
    const [bookmarked, setBookmarked] = useState([]);
    const [comicDetail, setComicDetail] = useState();

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
        const timeOutId = setTimeout(() => {
            setSearch(inputText);
            setViewPage(1);
        }, 1500);
        return () => clearTimeout(timeOutId);
    }, [inputText]);

    function paginationControls() {
        var pageCount = Math.ceil(content.total / content.limit);

        var startPage, endPage;
        if (pageCount <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = pageCount;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (viewPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (viewPage + 4 >= pageCount) {
                startPage = pageCount - 9;
                endPage = pageCount;
            } else {
                startPage = viewPage - 5;
                endPage = viewPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (viewPage - 1) * content.limit;
        var endIndex = Math.min(startIndex + content.limit - 1, content.total - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);


        return (<>
            <Pagination.First key={-4} onClick={(e) => {
                setViewPage(1)
            }}/>
            <Pagination.Prev key={-3} onClick={(e) => {
                setViewPage(viewPage - 1 < 1 ? 1 : viewPage - 1)
            }}/>
            {pages.map((page, i) => <>
                <Pagination.Item
                    variant="danger"
                    key={i}
                    active={viewPage == page}
                    onClick={(e) => {
                        setViewPage(page)
                    }}
                >
                    {page}
                </Pagination.Item>
            </>)}
            <Pagination.Next key={-2} onClick={(e) => {
                setViewPage(viewPage + 1 > pageCount ? pageCount : viewPage + 1)
            }}/>
            <Pagination.Last key={-1} onClick={(e) => {
                setViewPage(pageCount)
            }}/>
        </>);
    }

    function openModal(item) {
        setComicDetail(item);
    }

    function closeModal() {
        setComicDetail(null);
    }

    function handleBookmark(checked, item) {
        if (checked) {
            //Add to bookmarked list
            setBookmarked(bookmarked.concat([item]));
            console.log("added: " + item.id); //TODO remove
        } else {
            //Remove from bookmarked list
            setBookmarked(bookmarked.filter(function (rem) {
                return rem.id !== item.id
            }));
            console.log("removed: " + item.id);
        }
        console.log(bookmarked);
    }

    function showEmailDialog() {

    }

    function showBookmarks() {

    }

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
                                        setInputText("");
                                        setViewPage(1);
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
                                setViewPage(1);
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
                                name="sortOption"
                                value={sortOrders[0].value}
                                checked={sortOrders[0].value === sortOrder}
                                onChange={(e) => {
                                    setSortOrder(e.currentTarget.value);
                                    setViewPage(1);
                                }}
                            >
                                <SortDownAlt/>
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                variant="outline-secondary"
                                name="sortOption"
                                value={sortOrders[1].value}
                                checked={sortOrders[1].value === sortOrder}
                                onChange={(e) => {
                                    setSortOrder(e.currentTarget.value);
                                    setViewPage(1);
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
                            defaultValue="20"
                            size="sm"
                            as="select"
                            onChange={(e) => {
                                setViewLimit(e.currentTarget.value);
                                setViewPage(1);
                            }}
                        >
                            <option>20</option>
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
            {content?.results && content.results.length > 0 ? <>
                    <Row>
                        <Col>
                            <p>Showing: {content?.offset || 0} - {(content?.offset || 0) + (content?.count || 0)} of {content?.total || 0}</p>
                        </Col>
                        <Col>
                            {bookmarked.length > 0 && <>
                                <Button variant="warning" onClick={(e) => {setBookmarked([])}}>
                                    <BookmarkX/>
                                </Button>
                                <Button variant="secondary" onClick={(e) => {showBookmarks()}}>
                                    <Bookmarks/>&nbsp;{bookmarked.length}
                                </Button>
                                <Button variant="danger" onClick={(e) => {showEmailDialog()}}>
                                    <Envelope/>&nbsp;Send
                                </Button>
                            </>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Details show={!!comicDetail} callback={closeModal} item={comicDetail}/>
                            <ul className={viewMode == "grid" ? "grid-view" : "list-view"}>
                                {content.results.map((item, i) =>
                                    <li key={i}>
                                        <Form.Check variant="danger" aria-label="bookbark comic"
                                                    checked={bookmarked.some((i) => item.id === i.id)} onChange={(e) => {
                                            handleBookmark(e.currentTarget.checked, item);
                                        }}/>
                                        <img src={item.thumbnail.path + "." + item.thumbnail.extension}
                                             height="150px"/>
                                        <p>Title: {item.title}</p>
                                        <p>Description: {item.description}</p>
                                        <p>Page count: {item.pageCount}</p>
                                        <Button
                                            variant="danger"
                                            onClick={(e) => {
                                                openModal(item)
                                            }}>Details</Button>
                                    </li>
                                )}
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Pagination variant="danger">
                                {paginationControls()}
                            </Pagination>
                        </Col>
                    </Row>
                </> :
                <Row>
                    <Col>
                        <p>No results</p>
                    </Col>
                </Row>
            }
        </Container>
    );
}