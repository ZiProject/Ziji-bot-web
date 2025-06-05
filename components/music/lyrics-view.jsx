"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { FaMusic, FaEdit, FaTimes } from "react-icons/fa"

export function LyricsView({
	lyrics,
	parsedLyrics,
	currentLyricIndex,
	currentSearchTitle,
	lyricsRef,
	handleLyrics,
	playerStats,
	clearLyrics,
}) {
	const [customTitle, setCustomTitle] = useState("")
	const [isCustomSearch, setIsCustomSearch] = useState(false)
	const [isEditMode, setIsEditMode] = useState(false)
	const [editTitle, setEditTitle] = useState("")

	const handleCustomLyricsSearch = () => {
		if (customTitle.trim()) {
			handleLyrics(customTitle)
			setIsCustomSearch(false)
			setCustomTitle("")
		}
	}

	const handleEditTitle = () => {
		setEditTitle(currentSearchTitle)
		setIsEditMode(true)
	}

	const handleSaveEdit = () => {
		if (editTitle.trim()) {
			handleLyrics(editTitle)
			setIsEditMode(false)
		}
	}

	const handleCancelEdit = () => {
		setIsEditMode(false)
		setEditTitle("")
	}

	const handleClearLyrics = () => {
		clearLyrics()
		setIsEditMode(false)
		setIsCustomSearch(false)
		setCustomTitle("")
		setEditTitle("")
	}

	return (
		<ScrollArea className="h-[600px] pr-4" ref={lyricsRef}>
			{lyrics.length > 0 ? (
				<div className="ml-6">
					<div className="flex items-center justify-between mb-4">
						<div className="text-center flex-grow">
							{!isEditMode ? (
								<>
									<h3 className="text-lg font-semibold mb-2">{lyrics[0].name}</h3>
									<h4 className="text-sm font-semibold mb-2">{lyrics[0].artistName}</h4>
								</>
							) : (
								<div className="flex flex-col gap-2 max-w-xs mx-auto">
									<Input
										value={editTitle}
										onChange={(e) => setEditTitle(e.target.value)}
										placeholder="Edit song title"
										className="text-center"
									/>
									<div className="flex gap-2 justify-center">
										<Button size="sm" onClick={handleSaveEdit}>
											Save
										</Button>
										<Button size="sm" variant="outline" onClick={handleCancelEdit}>
											Cancel
										</Button>
									</div>
								</div>
							)}
						</div>
						<div className="flex gap-2">
							{!isEditMode && (
								<Button size="sm" variant="outline" onClick={handleEditTitle} className="flex items-center gap-1">
									<FaEdit className="h-3 w-3" />
									Edit
								</Button>
							)}
							<Button size="sm" variant="outline" onClick={handleClearLyrics} className="flex items-center gap-1">
								<FaTimes className="h-3 w-3" />
								Clear
							</Button>
						</div>
					</div>

					{!isEditMode && (
						<>
							{parsedLyrics.length > 0 ? (
								<div className="space-y-2 text-lg">
									{parsedLyrics.map((lyric, index) => (
										<div
											key={index}
											id={`lyric-${index}`}
											className={`py-1 transition-colors duration-300 ${
												index === currentLyricIndex ? "font-bold" : ""
											}`}
										>
											{lyric.text}
										</div>
									))}
								</div>
							) : (
								<div className="whitespace-pre-line">{lyrics[0].plainLyrics}</div>
							)}
						</>
					)}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-[300px]">
					<FaMusic className="h-12 w-12 mb-4 text-muted-foreground" />
					<p className="text-muted-foreground">
						{playerStats.currentTrack
							? "Click the lyrics button to load lyrics for the current track"
							: "No track is currently playing"}
					</p>

					{!isCustomSearch ? (
						<div className="flex flex-col gap-2 mt-4">
							{playerStats.currentTrack && (
								<Button onClick={() => handleLyrics()}>Load Lyrics for Current Track</Button>
							)}
							<Button variant="outline" onClick={() => setIsCustomSearch(true)}>
								Enter Custom Title
							</Button>
						</div>
					) : (
						<div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
							<div className="flex gap-2">
								<Input
									value={customTitle}
									onChange={(e) => setCustomTitle(e.target.value)}
									placeholder="Enter song title"
									className="flex-grow"
								/>
								<Button onClick={handleCustomLyricsSearch}>Search</Button>
							</div>
							<Button variant="ghost" size="sm" onClick={() => setIsCustomSearch(false)}>
								Cancel
							</Button>
						</div>
					)}
				</div>
			)}
		</ScrollArea>
	)
}
