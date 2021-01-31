import * as Yup from 'yup';

 export  const validationSchema = Yup.object().shape({
    Playlistid: Yup.string()
        .required("Playlist id can't be empty")
});