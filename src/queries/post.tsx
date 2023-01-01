import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "../utilities/fetchApi";
const queryClient = useQueryClient();

export const mutation = useMutation({
	mutationFn: createPost,
	mutationKey: "posts",
	onSuccess: (newPost) => {
		queryClient.setQueryData(["posts"], (oldData) => [
			...(oldData ?? []),
			newPost,
		]);
		queryClient.invalidateQueries(["posts"]);
	},
});
