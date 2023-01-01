import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getPosts } from "../../utilities/fetchApi";
import { useState } from "react";
const posts = [
	{
		user: {
			username: "user name 1",
			avatar:
				"https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
		},
		date: "September 14, 2016",
		img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574",
		message:
			"Lorem ipsum dowrqett consectetur adipisicing elit. Cupiditate laborum reiciendis molestiae perferendis in, accusamus consequuntur, sed excepturi nisi voluptate nulla aspernatur beatae sapiente dolorem impedit pariatur vero velit repellendus 1 💥💢",
		reactions: 3,
	},
	{
		user: {
			username: "user name 4",
			avatar: "https://cdn-icons-png.flaticon.com/512/168/168882.png",
		},
		img: "https://a.cdn-hotels.com/gdcs/production196/d970/cd40235b-5990-4067-8c05-c7d04711a312.jpg?impolicy=fcrop&w=800&h=533&q=medium",

		date: "September 24, 2016",
		message:
			"Lorem ipsum dasdsit amet consectetur adipisicing elit. Cupiditate laborum reiciendis molestiae perferendis in, accusamus consequuntur, sed excepturi nisi voluptate nulla aspernatur beatae sapiente dolorem impedit pariatur vero velit repellendus 1 💥💢",
		reactions: 1,
	},
	{
		date: "September 22, 2016",
		img: "https://iamafoodblog.b-cdn.net/wp-content/uploads/2012/07/paella-9174.jpg",
		message:
			"Lorem ipsum dfg sit amet consectetur adipisicing elit. Cupiditate laborum reiciendis molestiae perferendis in, accusamus consequuntur, sed excepturi nisi voluptate nulla aspernatur beatae sapiente dolorem impedit pariatur vero velit repellendus 1 💥💢",
		user: {
			username: "user name 5",
			avatar:
				"https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png",
		},
		reactions: 7,
	},
	{
		date: "September 21, 2016",
		img: "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg",
		message:
			"Lorem ipsum dsdfor sit amet consectetur adipisicing elit. Cupiditate laborum reiciendis molestiae perferendis in, accusamus consequuntur, sed excepturi nisi voluptate nulla aspernatur beatae sapiente dolorem impedit pariatur vero velit repellendus 1 💥💢",
		user: {
			username: "user name 2",
			avatar:
				"https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png",
		},
		reactions: 4,
	},
];

function FeedPosts() {
	const { data, status } = useQuery(["posts"], () => getPosts());
	status === "success" && console.log(data);

	return (
		status === "success" && (
			<Grid container rowSpacing={3}>
				{data.map((post) => (
					<Grid key={post.message} item xs={12}>
						<PostCard {...post} />
					</Grid>
				))}
			</Grid>
		)
	);
}

export default FeedPosts;
