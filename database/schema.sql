--
-- PostgreSQL database dump
--

\restrict sHLY2h8bH4zvAFJwZj7tQXOFObj0DERDMjq15ciTGF8oZONa0KPHBkfaxjGdJDk

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-17 01:05:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 16472)
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    user_id integer,
    action character varying(100) NOT NULL,
    target_type character varying(50),
    target_name character varying(255),
    details text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16471)
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activities_id_seq OWNER TO postgres;

--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 229
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- TOC entry 226 (class 1259 OID 16439)
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_logs (
    id integer NOT NULL,
    user_name character varying(100) NOT NULL,
    action character varying(255) NOT NULL,
    target_type character varying(50),
    target_name character varying(255),
    details text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.activity_logs OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16438)
-- Name: activity_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activity_logs_id_seq OWNER TO postgres;

--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 225
-- Name: activity_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_logs_id_seq OWNED BY public.activity_logs.id;


--
-- TOC entry 228 (class 1259 OID 16452)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    type character varying(50) DEFAULT 'info'::character varying,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16451)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 227
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 224 (class 1259 OID 16426)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    status character varying(50) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16425)
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 223
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- TOC entry 222 (class 1259 OID 16407)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    status character varying(50) DEFAULT 'todo'::character varying,
    priority character varying(50) DEFAULT 'medium'::character varying,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    project_id integer,
    due_date date,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16406)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 221
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    role character varying(100) DEFAULT 'AI Engineer'::character varying,
    avatar text,
    bio text,
    skills text[],
    provider character varying(20) DEFAULT 'local'::character varying,
    provider_id character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4899 (class 2604 OID 16475)
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- TOC entry 4893 (class 2604 OID 16442)
-- Name: activity_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs ALTER COLUMN id SET DEFAULT nextval('public.activity_logs_id_seq'::regclass);


--
-- TOC entry 4895 (class 2604 OID 16455)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 4890 (class 2604 OID 16429)
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- TOC entry 4885 (class 2604 OID 16410)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 4881 (class 2604 OID 16393)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5077 (class 0 OID 16472)
-- Dependencies: 230
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activities (id, user_id, action, target_type, target_name, details, created_at) FROM stdin;
1	3	Created Task	Task	pulse enterprises	Created task "pulse enterprises"	2026-06-29 11:29:06.80613
2	3	Created Task	Task	python	Created task "python"	2026-07-02 11:36:47.074639
3	3	created task	task	python	Created "python"	2026-07-02 11:36:47.087014
4	3	Deleted Task	Task	python	Deleted task "python"	2026-07-02 11:38:21.299818
5	3	deleted task	task	python	Deleted "python"	2026-07-02 11:38:21.323525
6	3	Created Task	Task	python	Created task "python"	2026-07-02 12:56:05.455597
7	3	created task	task	python	Created "python"	2026-07-02 12:56:05.47234
8	3	Deleted Task	Task	python	Deleted task "python"	2026-07-02 12:56:09.117895
9	3	deleted task	task	python	Deleted "python"	2026-07-02 12:56:09.131645
10	3	updated task	task	pulse enterprises	Updated "pulse enterprises"	2026-07-02 13:13:06.653316
11	3	updated task	task	figma	Updated "figma"	2026-07-05 23:14:45.41316
12	3	updated task	task	pulse enterprises	Updated "pulse enterprises"	2026-07-05 23:15:02.312843
13	3	updated task	task	pulse enterprises	Updated "pulse enterprises"	2026-07-06 00:09:12.710998
14	3	Created Task	Task	python	Created task "python"	2026-07-06 00:19:21.949657
15	3	created task	task	python	Created "python"	2026-07-06 00:19:21.959685
16	3	updated task	task	figma	Updated "figma"	2026-07-06 00:29:16.639093
17	3	Created Task	Task	software developer 	Created task "software developer "	2026-07-06 16:29:42.149949
18	3	created task	task	software developer 	Created "software developer "	2026-07-06 16:29:42.162996
19	3	Created Project	Project	Ai  Project	Created project "Ai  Project"	2026-07-07 23:46:15.714918
20	3	Updated Project	Project	Ai  Projects	Updated project "Ai  Projects"	2026-07-08 23:04:03.985367
21	3	Deleted Project	Project	Ai  Projects	Deleted project "Ai  Projects"	2026-07-08 23:04:44.282928
22	3	Created Task	Task	python ml	Created task "python ml"	2026-07-09 00:10:54.393217
23	3	created task	task	python ml	Created "python ml"	2026-07-09 00:10:54.400238
24	3	Created Task	Task	firebase	Created task "firebase"	2026-07-12 12:37:54.896384
25	3	created task	task	firebase	Created "firebase"	2026-07-12 12:37:54.902816
\.


--
-- TOC entry 5073 (class 0 OID 16439)
-- Dependencies: 226
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity_logs (id, user_name, action, target_type, target_name, details, created_at) FROM stdin;
1	Parv	created task	task	Docker Setup	Created task from dashboard	2026-06-25 00:30:51.951381
\.


--
-- TOC entry 5075 (class 0 OID 16452)
-- Dependencies: 228
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, title, message, type, is_read, created_at) FROM stdin;
1	Task Created	Docker Setup task created successfully.	success	t	2026-06-25 10:19:47.436302
\.


--
-- TOC entry 5071 (class 0 OID 16426)
-- Dependencies: 224
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, description, status, created_at, user_id) FROM stdin;
1	Pulse Enterprise	Enterprise Project Management Platform	active	2026-06-24 21:00:24.555748	3
\.


--
-- TOC entry 5069 (class 0 OID 16407)
-- Dependencies: 222
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, title, description, status, priority, user_id, created_at, project_id, due_date, updated_at) FROM stdin;
16	firebase	firebase added	in_progress	Low	3	2026-07-12 12:37:54.868428	1	2026-10-22	2026-07-13 11:38:57.393789
7	docker setup	docker	todo	medium	2	2026-06-26 20:54:08.601658	\N	\N	2026-07-05 23:36:23.853124
10	pulse enterprises	pulsess	13	Medium	3	2026-06-29 11:29:06.799238	\N	\N	2026-07-13 11:39:10.228831
8	dockerise	making docker file	done	medium	2	2026-06-26 21:03:59.831621	\N	\N	2026-07-05 23:36:23.853124
9	figma	figma file	todo	High	3	2026-06-29 11:07:06.980668	\N	2026-07-10	2026-07-06 00:29:16.630683
13	python	python ml	backlog	Low	3	2026-07-06 00:19:21.936424	\N	\N	2026-07-06 16:27:24.273614
14	software developer 	java-script	todo	Urgent	3	2026-07-06 16:29:42.115698	\N	\N	2026-07-06 16:29:42.115698
15	python ml	ml concept	done	High	3	2026-07-09 00:10:54.372671	1	\N	2026-07-11 00:10:17.968577
\.


--
-- TOC entry 5067 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, created_at, role, avatar, bio, skills, provider, provider_id) FROM stdin;
1	Parv	parvtest@gmail.com	$2b$10$T9KKk11roMIEYzRj/orKr.HM.PQIbRKv.1gt4tnzbJk57WfrqsLIy	2026-06-24 16:39:42.232392	AI Engineer	\N	\N	\N	local	\N
2	parv	parvchaudhary@gmail.com	$2b$10$FQYCSR/nqayUSJSfHh7P0eAC.MknCmHPREAQ8rJ6RZg8.PUdN6SNO	2026-06-24 18:19:30.253884	AI Engineer	\N	\N	\N	local	\N
3	parv123	parv123@gmail.com	$2b$10$ICu81nl3uYMnIThm/Q3T3eV8Ah4F/5hznb9Ske/4mwCf0JxdRvx1i	2026-06-26 20:55:01.594014	AI Engineer	\N	\N	\N	local	\N
\.


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 229
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_id_seq', 25, true);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 225
-- Name: activity_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_logs_id_seq', 1, true);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 227
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, true);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 223
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 2, true);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 221
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 16, true);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 4914 (class 2606 OID 16482)
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4910 (class 2606 OID 16450)
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4912 (class 2606 OID 16465)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4908 (class 2606 OID 16437)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 4906 (class 2606 OID 16419)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 4902 (class 2606 OID 16404)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4904 (class 2606 OID 16402)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4918 (class 2606 OID 16483)
-- Name: activities activities_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4917 (class 2606 OID 16466)
-- Name: projects projects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4915 (class 2606 OID 16489)
-- Name: tasks tasks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE SET NULL;


--
-- TOC entry 4916 (class 2606 OID 16420)
-- Name: tasks tasks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-07-17 01:05:11

--
-- PostgreSQL database dump complete
--

\unrestrict sHLY2h8bH4zvAFJwZj7tQXOFObj0DERDMjq15ciTGF8oZONa0KPHBkfaxjGdJDk

