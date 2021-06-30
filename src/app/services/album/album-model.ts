import { DataDelimiter } from '../../common/data/data-delimiter';
import { AlbumData } from '../../common/data/entities/album-data';
import { FileSystem } from '../../common/io/file-system';
import { Strings } from '../../common/strings';
import { BaseTranslatorService } from '../translator/base-translator.service';

export class AlbumModel {
    constructor(private albumData: AlbumData, private translatorService: BaseTranslatorService, private fileSystem: FileSystem) {}

    public isSelected: boolean = false;
    public showYear: boolean = false;
    public yearHeader: string = '';

    public get artworkPath(): string {
        if (this.albumData.artworkId == undefined) {
            return '';
        }

        return this.fileSystem.coverArtFullPath(this.albumData.artworkId);
    }

    public get albumArtist(): string {
        const albumArtists = DataDelimiter.fromDelimitedString(this.albumData.albumArtists);

        if (albumArtists != undefined && albumArtists.length > 0) {
            return albumArtists[0];
        }

        const trackArtists = DataDelimiter.fromDelimitedString(this.albumData.artists);

        if (trackArtists != undefined && trackArtists.length > 0) {
            return trackArtists[0];
        }

        return this.translatorService.get('Album.UnknownArtist');
    }

    public get albumTitle(): string {
        if (Strings.isNullOrWhiteSpace(this.albumData.albumTitle)) {
            return this.translatorService.get('Album.UnknownTitle');
        }

        return this.albumData.albumTitle;
    }

    public get year(): number {
        return this.albumData.year;
    }

    public get albumKey(): string {
        return this.albumData.albumKey;
    }

    public get dateAddedInTicks(): number {
        return this.albumData.dateAdded;
    }

    public get dateFileCreatedInTicks(): number {
        return this.albumData.dateFileCreated;
    }

    public get dateLastPlayedInTicks(): number {
        return this.albumData.dateLastPlayed;
    }
}
