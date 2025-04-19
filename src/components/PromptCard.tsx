"use client";

import { PromptType, UserType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  post: PromptType | undefined;
  user: UserType | undefined;
  handleTagClick?: (e: any) => void;
  handleEdit?: (e: any) => void;
  handleDelete?: (e: any) => void;
};

function PromptCard({
  post,
  user,
  handleTagClick,
  handleEdit,
  handleDelete,
}: Props) {
  const [copied, setCopied] = useState<string>();
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleProfileClick = () => {
    if (user?.id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${user?.id}?name=${user?.name}`);
  };

  const handleCopy = () => {
    if (post != undefined) {
      setCopied(post?.prompt);
      navigator.clipboard.writeText(post?.prompt);
      setTimeout(() => setCopied(""), 3000);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5 h-full">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={user?.image!}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {user?.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={
              copied === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_btn"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post?.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag}
      </p>

      {session?.user.id === user?.id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t  border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
