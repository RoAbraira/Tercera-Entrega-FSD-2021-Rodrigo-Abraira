CREATE TABLE userdata(
	id	BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR (20) NOT NULL
	deleted BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE userstats(
	id	BIGSERIAL NOT null PRIMARY KEY,
	sessionsignin TIMESTAMP,
	sessionsignout TIMESTAMP,
	sessionduration INT NOT NULL,
	user_id BIGINT NOT NULL REFERENCES userdata (id)
);

CREATE TABLE users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	lastName VARCHAR (50) NOT NULL,
	mail VARCHAR (50) NOT NULL,
	password VARCHAR (30) NOT NULL
)

INSERT INTO users (name, lastname, mail, password) VALUES ('Pablo','Marmol','pablomarmol@gmail.com','1237');

/* aquí debajo paso los scripts de las bases de datos */

CREATE TABLE public.chatquerysa
(
    id integer,
    topics text COLLATE pg_catalog."default",
    closedanswera1 text COLLATE pg_catalog."default",
    closedanswera2 text COLLATE pg_catalog."default",
    closedanswera3 text COLLATE pg_catalog."default",
    closedanswera4 text COLLATE pg_catalog."default",
    closedanswera5 text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.chatquerysa
    OWNER to postgres;

	CREATE TABLE public.chatquerysb
(
    id integer,
    topics text COLLATE pg_catalog."default",
    closedanswerb1 text COLLATE pg_catalog."default",
    closedanswerb2 text COLLATE pg_catalog."default",
    closedanswerb3 text COLLATE pg_catalog."default",
    closedanswerb4 text COLLATE pg_catalog."default",
    closedanswerb5 text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.chatquerysb
    OWNER to postgres;

	CREATE TABLE public.chatregards
(
    id integer,
    regardword text COLLATE pg_catalog."default",
    regardbotanswer1 text COLLATE pg_catalog."default",
    regardbotanswer2 text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.chatregards
    OWNER to postgres;

	CREATE TABLE public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    mail character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

	CREATE TABLE public.userstats
(
    id bigint NOT NULL DEFAULT nextval('userstats_id_seq'::regclass),
    sessionsignin time without time zone,
    sessionsignout time without time zone,
    CONSTRAINT userstats_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.userstats
    OWNER to postgres;