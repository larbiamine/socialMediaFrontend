import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PostCard from "../components/feed/PostCard";

const myProfile = false;

const profile = {
	username: "jliam.exe",
	firstname: "Amine",
	lastname: "Larbi",
	avatar:
		"https://scontent.fcfk1-1.fna.fbcdn.net/v/t39.30808-6/239368917_3061858877418525_1779566369340735942_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGDxH3M0DbReoYlr8rtexzmLUSv3yWoCAItRK_fJagIAoqSbIXqnzpZR1YthJJ-wNC7fwPugHKO6dQBJhIdmaGp&_nc_ohc=xZuZJpK_wCsAX8OEpgI&tn=EFRiGTKvuk0DjdEO&_nc_ht=scontent.fcfk1-1.fna&oh=00_AfDLuUTRqaUrlbUq4r-z2xoJyfTapbyq8EKPUT7CvhTUjw&oe=63AE6014",
	posts: 82,
	followers: 885,
	following: 273,
	bio: "adipisicing elit. Quia accusantium officiis dolor labore perspiciatis animi aliquid illo maiors eum qui perferendisihil! Sequi, nobis?",
};
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
const profileBox = {
	marginTop: "70px",
	paddingTop: "50px",
	paddingLeft: "170px",
	paddingRight: "170px",
	backgroundColor: "myPrimary",
};
const avatar = {
	marginTop: 4,
	width: 200,
	height: 200,
};
function Profile() {
	return (
		<Box sx={profileBox}>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Avatar sx={avatar} src={profile.avatar} />
				</Grid>
				<Grid sx={{ marginTop: 5 }} item xs={8}>
					<Grid style={{ display: "flex", gap: "1rem" }}>
						<Typography fontWeight={"bold"} variant="h5" color="initial">
							{profile.username}
						</Typography>
						{myProfile ? (
							<>
								<Button size="small" color="mySecondary" variant="contained">
									{"Edit Profile "}
								</Button>
								<Button size="small" color="mySecondary" variant="outlined">
									{"Account Settings"}
								</Button>
							</>
						) : (
							<Button size="small" color="mySecondary" variant="contained">
								{"Follow "}
							</Button>
						)}
					</Grid>
					<Grid
						style={{ marginTop: 10, marginBottom: 10 }}
						container
						spacing={-20}
					>
						<Grid item xs={4}>
							<Typography fontSize={16} color="initial">
								Posts: {profile.posts}
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography fontSize={16} color="initial">
								Followers: {profile.followers}
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography fontSize={16} color="initial">
								Following: {profile.following}
							</Typography>
						</Grid>
					</Grid>
					<Typography fontSize={18} fontWeight={"bold"} color="initial">
						{profile.firstname + " " + profile.lastname}
					</Typography>
					<Typography fontSize={16} color="initial">
						{profile.bio}
					</Typography>
				</Grid>
			</Grid>
			<Grid sx={{ marginTop: 5 }} container rowSpacing={3}>
				{posts.map((post) => (
					<Grid key={post.message} item xs={12}>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							minHeight="100vh"
						>
							<PostCard {...post} />
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default Profile;
