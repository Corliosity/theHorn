--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: episodes; Type: TABLE; Schema: public; Owner: andrewcorliss; Tablespace: 
--

CREATE TABLE episodes (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    episodeuri character varying(255) NOT NULL,
    description character varying(500),
    updated date,
    duration character varying(50) NOT NULL
);


ALTER TABLE episodes OWNER TO andrewcorliss;

--
-- Name: episodes_id_seq; Type: SEQUENCE; Schema: public; Owner: andrewcorliss
--

CREATE SEQUENCE episodes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE episodes_id_seq OWNER TO andrewcorliss;

--
-- Name: episodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andrewcorliss
--

ALTER SEQUENCE episodes_id_seq OWNED BY episodes.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: andrewcorliss
--

ALTER TABLE ONLY episodes ALTER COLUMN id SET DEFAULT nextval('episodes_id_seq'::regclass);


--
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: andrewcorliss
--

COPY episodes (id, title, episodeuri, description, updated, duration) FROM stdin;
2	Episode-2	/assets/media/Episode-2.mp3	The Drugs episodes, completely with out own High weather girl.	2015-12-19	27:57
3	Episode-3	/assets/media/Episode-3.mp3	All about the common problems from a male point of view, oh how fun with our sausages.	2015-12-19	19:50
1	Episode-1	/assets/media/Episode-1.mp3	The first episode of our own podcast rolled out for you.	2015-12-19	20:35
\.


--
-- Name: episodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andrewcorliss
--

SELECT pg_catalog.setval('episodes_id_seq', 3, true);


--
-- Name: episodes_pkey; Type: CONSTRAINT; Schema: public; Owner: andrewcorliss; Tablespace: 
--

ALTER TABLE ONLY episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: andrewcorliss
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM andrewcorliss;
GRANT ALL ON SCHEMA public TO andrewcorliss;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

