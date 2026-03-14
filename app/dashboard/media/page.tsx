"use client";

import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { FaRegCopy, FaTrashAlt } from "react-icons/fa";
import useModal from "@/utils/hooks/useModal";
import DynamicButton from "@/components/elements/button/DynamicButton";
import BodyText from "@/components/elements/text/BodyText";

const MediaLibraryPage = () => {
  const files = useQuery(api.files.getAllFiles);
  const deleteFile = useMutation(api.files.deleteFile);
  const modal = useModal();

  return (
    <DashboardHeading title="Media Library">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {files?.map((file) => (
          <div
            key={file._id}
            className="aspect-square relative overflow-hidden rounded-lg group"
          >
            {file.url && (
              <Image
                src={file.url}
                alt={file._id}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 20vw"
              />
            )}

            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                className="p-1.5 rounded-md bg-black/60 text-white hover:bg-black/80 text-xs flex items-center gap-1"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(file._id);
                  }
                }}
              >
                <FaRegCopy className="w-3 h-3" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-md bg-red-600/80 text-white hover:bg-red-700 text-xs flex items-center gap-1"
                onClick={() => {
                  modal.setModalComponent(
                    <div className="flex flex-col gap-4">
                      <BodyText className="text-sm text-neutral-700">
                        Are you sure you want to delete this image?
                      </BodyText>
                      <div className="flex justify-end gap-2">
                        <DynamicButton
                          size="medium"
                          type="outline"
                          onPress={() => modal.setShown(false)}
                        >
                          Cancel
                        </DynamicButton>
                        <DynamicButton
                          size="medium"
                          type="orange"
                          onPress={async () => {
                            await deleteFile({ id: file._id });
                            modal.setModalComponent(
                              <div className="flex flex-col gap-4">
                                <BodyText className="text-sm text-neutral-700">
                                  Image deleted successfully.
                                </BodyText>
                                <div className="flex justify-end">
                                  <DynamicButton
                                    size="medium"
                                    onPress={() => modal.setShown(false)}
                                  >
                                    Close
                                  </DynamicButton>
                                </div>
                              </div>,
                              "normal",
                            );
                            modal.setShown(true);
                            setTimeout(() => modal.setShown(false), 2000);
                          }}
                        >
                          Delete
                        </DynamicButton>
                      </div>
                    </div>,
                    "normal",
                  );
                  modal.setShown(true);
                }}
              >
                <FaTrashAlt className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardHeading>
  );
};

export default MediaLibraryPage;
